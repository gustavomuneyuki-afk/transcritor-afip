import type { RenalData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function extractNumbers(text: string): string[] {
  return (
    text.match(
      /(?:[<>]=?\s*)?\d{1,3}(?:\.\d{3})*(?:,\d+)?|(?:[<>]=?\s*)?\d+(?:,\d+)?/g,
    ) ?? []
  );
}

function cleanValue(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  return value
    .replace(/\s+/g, "")
    .replace(/,0$/, "")
    .trim();
}

function isUrinaryCreatinineLine(line: PdfLine): boolean {
  const normalized = normalizeText(line.text);

  return (
    normalized.includes("urina") ||
    normalized.includes("urinaria") ||
    normalized.includes("amostra isolada") ||
    normalized.includes("relacao albumina") ||
    normalized.includes("relacao proteina")
  );
}

function findLineStartingWith(
  lines: PdfLine[],
  labels: string[],
  excludedTerms: string[] = [],
): PdfLine | undefined {
  const normalizedLabels = labels.map(normalizeText);
  const normalizedExcludedTerms = excludedTerms.map(normalizeText);

  return lines.find((line) => {
    const normalizedLine = normalizeText(line.text);

    const startsWithLabel = normalizedLabels.some((label) =>
      normalizedLine.startsWith(label),
    );

    const containsExcludedTerm = normalizedExcludedTerms.some((term) =>
      normalizedLine.includes(term),
    );

    return startsWithLabel && !containsExcludedTerm;
  });
}

function extractFirstValueAfterLabel(
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
     * Os rótulos podem possuir acentos, mas normalmente mantêm
     * o mesmo comprimento do texto original. Após remover o título,
     * o primeiro número corresponde ao resultado do exame.
     */
    const remainingText = line.text.slice(label.length);
    const values = extractNumbers(remainingText);

    return cleanValue(values[0]);
  }

  return cleanValue(extractNumbers(line.text)[0]);
}

function findSerumCreatinineLine(
  lines: PdfLine[],
): PdfLine | undefined {
  return lines.find((line) => {
    const normalized = normalizeText(line.text);

    return (
      normalized.startsWith("creatinina") &&
      !isUrinaryCreatinineLine(line)
    );
  });
}

function findGfrLine(lines: PdfLine[]): PdfLine | undefined {
  const labels = [
    "Taxa de Filtração Glomerular estimada",
    "Taxa de Filtracao Glomerular estimada",
    "Filtração Glomerular estimada",
    "Filtracao Glomerular estimada",
    "TFG estimada",
    "TFG",
    "eGFR",
  ];

  return findLineStartingWith(lines, labels);
}

function extractGfrValue(
  line: PdfLine | undefined,
): string | undefined {
  if (!line) {
    return undefined;
  }

  const normalized = normalizeText(line.text);

  const labels = [
    "taxa de filtracao glomerular estimada",
    "filtracao glomerular estimada",
    "tfg estimada",
    "tfg",
    "egfr",
  ];

  for (const label of labels) {
    if (!normalized.startsWith(label)) {
      continue;
    }

    /*
     * Procura o primeiro valor após o título. Também aceita
     * resultados como >90 ou >=90.
     */
    const approximateLabelLength = Math.min(
      line.text.length,
      label.length,
    );

    const remainingText = line.text.slice(approximateLabelLength);
    const values = extractNumbers(remainingText);

    if (values[0]) {
      return cleanValue(values[0]);
    }
  }

  /*
   * Plano alternativo para linhas em que o PDF separou o título
   * de maneira diferente.
   */
  const allValues = extractNumbers(line.text);

  return cleanValue(allValues[0]);
}

export function parseRenal(lines: PdfLine[]): RenalData {
  const ureaLabels = ["Ureia"];

  const ureaLine = findLineStartingWith(lines, ureaLabels, [
    "urina",
    "urinaria",
  ]);

  const creatinineLine = findSerumCreatinineLine(lines);
  const gfrLine = findGfrLine(lines);

  return {
    urea: extractFirstValueAfterLabel(ureaLine, ureaLabels),

    creatinine: extractFirstValueAfterLabel(
      creatinineLine,
      ["Creatinina"],
    ),

    estimatedGfr: extractGfrValue(gfrLine),
  };
}