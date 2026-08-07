import type { HemogramData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import {
  convertThousandsToAbsolute,
  extractFirstValueAfterLabel,
  extractNumbers,
  findLine,
  normalizeText,
} from "./parserUtils";

const HEMOGLOBIN_LABELS = [
  "Hemoglobina",
];

const HEMATOCRIT_LABELS = [
  "Hematócrito",
  "Hematocrito",
];

const LEUKOCYTE_LABELS = [
  "Leucócitos",
  "Leucocitos",
];

const NEUTROPHIL_LABELS = [
  "Neutrófilos",
  "Neutrofilos",
];

const LYMPHOCYTE_TOTAL_LABELS = [
  "Linfócitos totais",
  "Linfocitos totais",
];

const LYMPHOCYTE_TYPICAL_LABELS = [
  "Linfócitos típicos",
  "Linfocitos tipicos",
];

const PLATELET_LABELS = [
  "Plaquetas",
];

const RETICULOCYTE_HEADING_LABELS = [
  "Contagem de Reticulócitos",
  "Contagem de Reticulocitos",
];

const RETICULOCYTE_RELATIVE_LABELS = [
  "Valor relativo",
];

const RETICULOCYTE_ABSOLUTE_LABELS = [
  "Valor absoluto",
];

/*
 * Remove ",0" quando o valor não possui casas
 * decimais relevantes.
 *
 * Exemplo:
 * 43,0 -> 43
 * 16,5 -> 16,5
 */
function cleanDecimal(
  value: string | undefined,
): string | undefined {
  if (!value) {
    return undefined;
  }

  return value.replace(/,0$/, "");
}

/*
 * No leucograma da AFIP, a estrutura costuma ser:
 *
 * Neutrófilos 41,0 2,51 ...
 *
 * O primeiro valor é percentual.
 * O segundo é a contagem absoluta em milhares/mm³.
 */
function extractSecondNumericValue(
  line: PdfLine | undefined,
  labels: string[],
): string | undefined {
  if (!line) {
    return undefined;
  }

  const normalizedLine = normalizeText(line.text);

  const matchingLabel = labels.find((label) =>
    normalizedLine.startsWith(
      normalizeText(label),
    ),
  );

  const remainingText = matchingLabel
    ? line.text.slice(matchingLabel.length)
    : line.text;

  const values = extractNumbers(
    remainingText,
  );

  return values[1];
}

/*
 * Procura reticulócitos somente dentro da seção
 * "Contagem de Reticulócitos".
 *
 * Isso é importante porque "Valor relativo" e
 * "Valor absoluto" são nomes genéricos e podem
 * aparecer em outros exames.
 */
function parseReticulocytes(
  lines: PdfLine[],
): {
  relative?: string;
  absolute?: number;
} {
  const headingIndex = lines.findIndex(
    (line) => {
      const normalizedLine =
        normalizeText(line.text);

      return RETICULOCYTE_HEADING_LABELS.some(
        (label) =>
          normalizedLine.includes(
            normalizeText(label),
          ),
      );
    },
  );

  if (headingIndex === -1) {
    return {};
  }

  const headingLine = lines[headingIndex];
  const sectionLines: PdfLine[] = [];

  /*
   * Percorre apenas as linhas seguintes na
   * mesma página e interrompe após o final
   * da seção dos reticulócitos.
   */
  for (
    let index = headingIndex + 1;
    index < lines.length;
    index += 1
  ) {
    const line = lines[index];

    if (line.page !== headingLine.page) {
      break;
    }

    const normalizedLine =
      normalizeText(line.text);

    if (
      normalizedLine.startsWith(
        "colesterol total",
      )
    ) {
      break;
    }

    sectionLines.push(line);

    if (
      normalizedLine.startsWith(
        "liberado por",
      )
    ) {
      break;
    }
  }

  const relativeLine = findLine(
    sectionLines,
    RETICULOCYTE_RELATIVE_LABELS,
  );

  const absoluteLine = findLine(
    sectionLines,
    RETICULOCYTE_ABSOLUTE_LABELS,
  );

  const relative =
    extractFirstValueAfterLabel(
      relativeLine,
      RETICULOCYTE_RELATIVE_LABELS,
    );

  const absoluteRaw =
    extractFirstValueAfterLabel(
      absoluteLine,
      RETICULOCYTE_ABSOLUTE_LABELS,
    );

  /*
   * A AFIP apresenta, neste layout:
   *
   * Valor absoluto 34,3 x10/mm3
   *
   * portanto 34,3 corresponde a 34.300/mm³.
   */
  const absolute =
    convertThousandsToAbsolute(
      absoluteRaw,
    );

  return {
    relative: cleanDecimal(relative),
    absolute,
  };
}

export function parseHemogram(
  lines: PdfLine[],
): HemogramData {
  const hemoglobinLine = findLine(
    lines,
    HEMOGLOBIN_LABELS,
  );

  const hematocritLine = findLine(
    lines,
    HEMATOCRIT_LABELS,
  );

  const leukocyteLine = findLine(
    lines,
    LEUKOCYTE_LABELS,
  );

  const neutrophilLine = findLine(
    lines,
    NEUTROPHIL_LABELS,
  );

  const lymphocyteTotalLine = findLine(
    lines,
    LYMPHOCYTE_TOTAL_LABELS,
  );

  const lymphocyteTypicalLine = findLine(
    lines,
    LYMPHOCYTE_TYPICAL_LABELS,
  );

  /*
   * Dá preferência aos linfócitos totais.
   * Se não existirem, usa linfócitos típicos.
   */
  const lymphocyteLine =
    lymphocyteTotalLine ??
    lymphocyteTypicalLine;

  const lymphocyteLabels =
    lymphocyteTotalLine
      ? LYMPHOCYTE_TOTAL_LABELS
      : LYMPHOCYTE_TYPICAL_LABELS;

  const plateletLine = findLine(
    lines,
    PLATELET_LABELS,
  );

  const hemoglobin =
    extractFirstValueAfterLabel(
      hemoglobinLine,
      HEMOGLOBIN_LABELS,
    );

  const hematocrit =
    extractFirstValueAfterLabel(
      hematocritLine,
      HEMATOCRIT_LABELS,
    );

  const leukocytes =
    extractFirstValueAfterLabel(
      leukocyteLine,
      LEUKOCYTE_LABELS,
    );

  const neutrophils =
    extractSecondNumericValue(
      neutrophilLine,
      NEUTROPHIL_LABELS,
    );

  const lymphocytes =
    extractSecondNumericValue(
      lymphocyteLine,
      lymphocyteLabels,
    );

  const platelets =
    extractFirstValueAfterLabel(
      plateletLine,
      PLATELET_LABELS,
    );

  const reticulocytes =
    parseReticulocytes(lines);

  return {
    hemoglobin:
      cleanDecimal(hemoglobin),

    hematocrit:
      cleanDecimal(hematocrit),

    leukocytes:
      convertThousandsToAbsolute(
        leukocytes,
      ),

    neutrophils:
      convertThousandsToAbsolute(
        neutrophils,
      ),

    lymphocytes:
      convertThousandsToAbsolute(
        lymphocytes,
      ),

    platelets:
      convertThousandsToAbsolute(
        platelets,
      ),

    reticulocytesAbsolute:
      reticulocytes.absolute,

    reticulocytesRelative:
      reticulocytes.relative,
  };
}