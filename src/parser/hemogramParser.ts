import type { PdfLine } from "../utils/pdfReader";
import type { HemogramData } from "../types/exams";

/**
 * Remove acentos e padroniza o texto para facilitar a busca.
 */
function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/**
 * Procura uma linha cujo texto comece com o nome informado.
 */
function findLine(
  lines: PdfLine[],
  labels: string[],
): PdfLine | undefined {
  const normalizedLabels = labels.map(normalizeText);

  return lines.find((line) => {
    const normalizedLine = normalizeText(line.text);

    return normalizedLabels.some((label) =>
      normalizedLine.startsWith(label),
    );
  });
}

/**
 * Extrai números escritos como:
 *
 * 15,3
 * 7,78
 * 266
 * 1.250
 */
function extractNumbers(text: string): string[] {
  return text.match(/\d{1,3}(?:\.\d{3})*(?:,\d+)?|\d+(?:,\d+)?/g) ?? [];
}

/**
 * Remove o nome do exame antes de procurar os números.
 *
 * Isso evita capturar números que eventualmente estejam presentes
 * no próprio título.
 */
function extractNumbersAfterLabel(
  line: PdfLine | undefined,
  labels: string[],
): string[] {
  if (!line) {
    return [];
  }

  const normalizedLine = normalizeText(line.text);

  for (const label of labels) {
    const normalizedLabel = normalizeText(label);

    if (normalizedLine.startsWith(normalizedLabel)) {
      const remainingText = line.text.slice(label.length);
      return extractNumbers(remainingText);
    }
  }

  return extractNumbers(line.text);
}

/**
 * Converte um valor brasileiro para número JavaScript.
 *
 * Exemplos:
 * "7,78" → 7.78
 * "1.250,4" → 1250.4
 */
function parseBrazilianNumber(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value
    .replace(/\./g, "")
    .replace(",", ".");

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : undefined;
}

/**
 * Nos PDFs da AFIP, leucócitos e contagens diferenciais aparecem
 * em milhares por mm³.
 *
 * Exemplo:
 * 7,78 Mil/mm³ → 7.780/mm³
 */
function convertThousandsToAbsolute(
  value: string | undefined,
): number | undefined {
  const parsed = parseBrazilianNumber(value);

  if (parsed === undefined) {
    return undefined;
  }

  return Math.round(parsed * 1000);
}

/**
 * Plaquetas aparecem como:
 *
 * 266 Mil/mm³
 *
 * e devem ser exibidas como:
 *
 * 266.000
 */
function convertPlatelets(
  value: string | undefined,
): number | undefined {
  return convertThousandsToAbsolute(value);
}

/**
 * Remove ",0" de valores inteiros.
 *
 * "43,0" → "43"
 * "15,3" → "15,3"
 */
function cleanDecimal(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  return value.replace(/,0$/, "");
}

export function parseHemogram(lines: PdfLine[]): HemogramData {
  const hemoglobinLabels = ["Hemoglobina"];
  const hematocritLabels = ["Hematócrito", "Hematocrito"];
  const leukocyteLabels = ["Leucócitos", "Leucocitos"];
  const neutrophilLabels = ["Neutrófilos", "Neutrofilos"];
  const lymphocyteTotalLabels = [
    "Linfócitos totais",
    "Linfocitos totais",
  ];
  const lymphocyteTypicalLabels = [
    "Linfócitos típicos",
    "Linfocitos tipicos",
  ];
  const plateletLabels = ["Plaquetas"];

  const hemoglobinLine = findLine(lines, hemoglobinLabels);
  const hematocritLine = findLine(lines, hematocritLabels);
  const leukocyteLine = findLine(lines, leukocyteLabels);
  const neutrophilLine = findLine(lines, neutrophilLabels);

  const lymphocyteLine =
    findLine(lines, lymphocyteTotalLabels) ??
    findLine(lines, lymphocyteTypicalLabels);

  const plateletLine = findLine(lines, plateletLabels);

  const hemoglobinNumbers = extractNumbersAfterLabel(
    hemoglobinLine,
    hemoglobinLabels,
  );

  const hematocritNumbers = extractNumbersAfterLabel(
    hematocritLine,
    hematocritLabels,
  );

  const leukocyteNumbers = extractNumbersAfterLabel(
    leukocyteLine,
    leukocyteLabels,
  );

  const neutrophilNumbers = extractNumbersAfterLabel(
    neutrophilLine,
    neutrophilLabels,
  );

  const lymphocyteNumbers = extractNumbersAfterLabel(
    lymphocyteLine,
    lymphocyteLine ===
      findLine(lines, lymphocyteTotalLabels)
      ? lymphocyteTotalLabels
      : lymphocyteTypicalLabels,
  );

  const plateletNumbers = extractNumbersAfterLabel(
    plateletLine,
    plateletLabels,
  );

  return {
    hemoglobin: cleanDecimal(hemoglobinNumbers[0]),
    hematocrit: cleanDecimal(hematocritNumbers[0]),

    // Leucócitos: primeiro valor numérico da linha.
    leukocytes: convertThousandsToAbsolute(leukocyteNumbers[0]),

    // Neutrófilos: primeiro número é porcentagem;
    // o segundo é a contagem absoluta.
    neutrophils: convertThousandsToAbsolute(neutrophilNumbers[1]),

    // Linfócitos: primeiro número é porcentagem;
    // o segundo é a contagem absoluta.
    lymphocytes: convertThousandsToAbsolute(lymphocyteNumbers[1]),

    platelets: convertPlatelets(plateletNumbers[0]),
  };
}