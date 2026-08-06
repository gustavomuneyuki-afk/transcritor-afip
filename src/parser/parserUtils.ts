import type { PdfLine } from "../utils/pdfReader";

export type ExtractionStrategy =
  | "inline"
  | "result"
  | "inline-or-result"
  | "all-matches";

export type ExamDefinition<Key extends string = string> = {
  key: Key;
  labels: string[];
  strategy: ExtractionStrategy;

  /**
   * Termos usados para ignorar linhas indesejadas.
   *
   * Exemplo: evitar que "Creatinina urinária" seja
   * confundida com creatinina sérica.
   */
  excludedTerms?: string[];

  /**
   * Textos removidos antes de extrair números.
   *
   * Exemplo: "(A1C)" contém o número 1, mas ele não
   * representa o resultado da hemoglobina glicada.
   */
  ignoredPatterns?: RegExp[];

  /**
   * Quantidade máxima de linhas abaixo do título em que
   * procuraremos uma linha iniciada por "Resultado".
   */
  maxFollowingLines?: number;
};

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

function containsExcludedTerm(
  line: PdfLine,
  excludedTerms: string[],
): boolean {
  const normalizedLine = normalizeText(line.text);

  return excludedTerms
    .map(normalizeText)
    .some((term) => normalizedLine.includes(term));
}

function lineStartsWithAnyLabel(
  line: PdfLine,
  labels: string[],
): boolean {
  const normalizedLine = normalizeText(line.text);

  return labels
    .map(normalizeText)
    .some((label) => normalizedLine.startsWith(label));
}

export function findAllLines(
  lines: PdfLine[],
  labels: string[],
  excludedTerms: string[] = [],
): PdfLine[] {
  return lines.filter((line) => {
    const matchesLabel = lineStartsWithAnyLabel(
      line,
      labels,
    );

    const isExcluded = containsExcludedTerm(
      line,
      excludedTerms,
    );

    return matchesLabel && !isExcluded;
  });
}

export function findLine(
  lines: PdfLine[],
  labels: string[],
  excludedTerms: string[] = [],
): PdfLine | undefined {
  return findAllLines(
    lines,
    labels,
    excludedTerms,
  )[0];
}

function removeIgnoredPatterns(
  value: string,
  patterns: RegExp[],
): string {
  return patterns.reduce(
    (currentValue, pattern) =>
      currentValue.replace(pattern, ""),
    value,
  );
}

function findMatchingLabel(
  line: PdfLine,
  labels: string[],
): string | undefined {
  const normalizedLine = normalizeText(line.text);

  return labels.find((label) =>
    normalizedLine.startsWith(
      normalizeText(label),
    ),
  );
}

export function extractFirstValueAfterLabel(
  line: PdfLine | undefined,
  labels: string[],
  ignoredPatterns: RegExp[] = [],
): string | undefined {
  if (!line) {
    return undefined;
  }

  const matchingLabel = findMatchingLabel(
    line,
    labels,
  );

  if (!matchingLabel) {
    return undefined;
  }

  const remainingText = line.text.slice(
    matchingLabel.length,
  );

  const sanitizedText = removeIgnoredPatterns(
    remainingText,
    ignoredPatterns,
  );

  return cleanValue(
    extractNumbers(sanitizedText)[0],
  );
}

function extractInlineFromAllMatches(
  lines: PdfLine[],
  definition: ExamDefinition,
): string | undefined {
  const matchingLines = findAllLines(
    lines,
    definition.labels,
    definition.excludedTerms,
  );

  for (const line of matchingLines) {
    const value = extractFirstValueAfterLabel(
      line,
      definition.labels,
      definition.ignoredPatterns,
    );

    if (value) {
      return value;
    }
  }

  return undefined;
}

function extractResultAfterMatchingHeading(
  lines: PdfLine[],
  definition: ExamDefinition,
): string | undefined {
  const matchingLines = findAllLines(
    lines,
    definition.labels,
    definition.excludedTerms,
  );

  const maxFollowingLines =
    definition.maxFollowingLines ?? 8;

  for (const headingLine of matchingLines) {
    const headingIndex = lines.indexOf(
      headingLine,
    );

    if (headingIndex === -1) {
      continue;
    }

    for (
      let offset = 1;
      offset <= maxFollowingLines;
      offset += 1
    ) {
      const candidate =
        lines[headingIndex + offset];

      if (
        !candidate ||
        candidate.page !== headingLine.page
      ) {
        break;
      }

      const normalizedCandidate = normalizeText(
        candidate.text,
      );

      if (
        !normalizedCandidate.startsWith(
          "resultado",
        )
      ) {
        continue;
      }

      const value = cleanValue(
        extractNumbers(candidate.text)[0],
      );

      if (value) {
        return value;
      }
    }
  }

  return undefined;
}

export function extractResultAfterHeading(
  lines: PdfLine[],
  labels: string[],
  maxFollowingLines = 8,
  excludedTerms: string[] = [],
): string | undefined {
  return extractResultAfterMatchingHeading(
    lines,
    {
      key: "temporary",
      labels,
      strategy: "result",
      maxFollowingLines,
      excludedTerms,
    },
  );
}

export function extractExamValue(
  lines: PdfLine[],
  definition: ExamDefinition,
): string | undefined {
  switch (definition.strategy) {
    case "inline":
      return extractFirstValueAfterLabel(
        findLine(
          lines,
          definition.labels,
          definition.excludedTerms,
        ),
        definition.labels,
        definition.ignoredPatterns,
      );

    case "result":
      return extractResultAfterMatchingHeading(
        lines,
        definition,
      );

    case "all-matches":
      return extractInlineFromAllMatches(
        lines,
        definition,
      );

    case "inline-or-result":
      return (
        extractInlineFromAllMatches(
          lines,
          definition,
        ) ??
        extractResultAfterMatchingHeading(
          lines,
          definition,
        )
      );

    default:
      return undefined;
  }
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

  return Number.isFinite(parsed)
    ? parsed
    : undefined;
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

export function formatInteger(
  value: number,
): string {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 0,
  }).format(value);
}