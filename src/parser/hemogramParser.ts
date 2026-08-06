import type { HemogramData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import {
  convertThousandsToAbsolute,
  extractFirstValueAfterLabel,
  extractNumbers,
  findLine,
} from "./parserUtils";

const HEMOGLOBIN_LABELS = ["Hemoglobina"];

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

const PLATELET_LABELS = ["Plaquetas"];

function cleanDecimal(
  value: string | undefined,
): string | undefined {
  if (!value) {
    return undefined;
  }

  return value.replace(/,0$/, "");
}

function extractSecondNumericValue(
  line: PdfLine | undefined,
  labels: string[],
): string | undefined {
  if (!line) {
    return undefined;
  }

  const firstValue = extractFirstValueAfterLabel(
    line,
    labels,
  );

  if (!firstValue) {
    return undefined;
  }

  const label = labels.find((currentLabel) =>
    line.text
      .toLowerCase()
      .startsWith(currentLabel.toLowerCase()),
  );

  const remainingText = label
    ? line.text.slice(label.length)
    : line.text;

  const values = extractNumbers(remainingText);

  return values[1];
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

  const lymphocyteLine =
    lymphocyteTotalLine ?? lymphocyteTypicalLine;

  const lymphocyteLabels = lymphocyteTotalLine
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

  return {
    hemoglobin: cleanDecimal(hemoglobin),
    hematocrit: cleanDecimal(hematocrit),

    leukocytes:
      convertThousandsToAbsolute(leukocytes),

    neutrophils:
      convertThousandsToAbsolute(neutrophils),

    lymphocytes:
      convertThousandsToAbsolute(lymphocytes),

    platelets:
      convertThousandsToAbsolute(platelets),
  };
}