import type { PdfLine } from "../utils/pdfReader";

export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function extractNumbers(text: string): string[] {
  return (
    text.match(
      /(?:[<>]=?\s*)?\d{1,3}(?:\.\d{3})*(?:,\d+)?|(?:[<>]=?\s*)?\d+(?:,\d+)?/g,
    ) ?? []
  );
}

export function cleanValue(
  value: string | undefined,
): string | undefined {
  if (!value) {
    return undefined;
  }

  return value
    .replace(/\s+/g, "")
    .replace(/,0$/, "")
    .trim();
}

export function findLine(
  lines: PdfLine[],
  labels: string[],
  excludedTerms: string[] = [],
): PdfLine | undefined {
  const normalizedLabels = labels.map(normalizeText);
  const normalizedExcludedTerms =
    excludedTerms.map(normalizeText);

  return lines.find((line) => {
    const normalizedLine = normalizeText(line.text);

    const matchesLabel = normalizedLabels.some((label) =>
      normalizedLine.startsWith(label),
    );

    const containsExcludedTerm =
      normalizedExcludedTerms.some((term) =>
        normalizedLine.includes(term),
      );

    return matchesLabel && !containsExcludedTerm;
  });
}

export function extractFirstValueAfterLabel(
  line: PdfLine | undefined,
  labels: string[],
): string | undefined {
  if (!line) {
    return undefined;
  }

  const normalizedLine = normalizeText(line.text);

  for (const label of labels) {
    const normalizedLabel = normalizeText(label);

    if (!normalizedLine.startsWith(normalizedLabel)) {
      continue;
    }

    /*
     * Remove o título usando o comprimento do rótulo original
     * e procura o primeiro valor numérico restante.
     */
    const remainingText = line.text.slice(label.length);
    const values = extractNumbers(remainingText);

    return cleanValue(values[0]);
  }

  return cleanValue(extractNumbers(line.text)[0]);
}

export function parseBrazilianNumber(
  value: string | undefined,
): number | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value
    .replace(/[<>]=?/g, "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim();

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : undefined;
}

export function convertThousandsToAbsolute(
  value: string | undefined,
): number | undefined {
  const parsed = parseBrazilianNumber(value);

  if (parsed === undefined) {
    return undefined;
  }

  return Math.round(parsed * 1000);
}

export function formatInteger(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 0,
  }).format(value);
}
export function extractResultAfterHeading(
  lines: PdfLine[],
  labels: string[],
  maxFollowingLines = 5,
): string | undefined {
  const normalizedLabels = labels.map(normalizeText);

  const headingIndex = lines.findIndex((line) => {
    const normalizedLine = normalizeText(line.text);

    return normalizedLabels.some((label) =>
      normalizedLine.startsWith(label),
    );
  });

  if (headingIndex === -1) {
    return undefined;
  }

  const headingLine = lines[headingIndex];
  const normalizedHeading = normalizeText(headingLine.text);

  /*
   * Primeiro tenta obter o valor na própria linha do exame.
   * Remove "(A1C)" para não interpretar o número 1 como resultado.
   */
  for (const label of labels) {
    const normalizedLabel = normalizeText(label);

    if (!normalizedHeading.startsWith(normalizedLabel)) {
      continue;
    }

    const remainingText = headingLine.text
      .slice(label.length)
      .replace(/\(\s*A1C\s*\)/gi, "")
      .replace(/\bHbA1c\b/gi, "");

    const directValues = extractNumbers(remainingText);

    if (directValues[0]) {
      return cleanValue(directValues[0]);
    }
  }

  /*
   * Caso o título não contenha o valor, procura uma linha
   * "Resultado" logo abaixo, na mesma página.
   */
  for (
    let offset = 1;
    offset <= maxFollowingLines;
    offset += 1
  ) {
    const candidate = lines[headingIndex + offset];

    if (!candidate || candidate.page !== headingLine.page) {
      break;
    }

    const normalizedCandidate = normalizeText(candidate.text);

    if (normalizedCandidate.startsWith("resultado")) {
      return cleanValue(extractNumbers(candidate.text)[0]);
    }
  }

  return undefined;
}