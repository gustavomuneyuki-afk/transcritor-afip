import type { GlycemicData } from "../types/exams";
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

    const remainingText = line.text.slice(label.length);
    const values = extractNumbers(remainingText);

    return cleanValue(values[0]);
  }

  return cleanValue(extractNumbers(line.text)[0]);
}

function findGlycatedHemoglobinLine(
  lines: PdfLine[],
): PdfLine | undefined {
  const labels = [
    "Hemoglobina Glicada",
    "Hemoglobina Glicosilada",
    "HbA1c",
    "A1C",
  ];

  return findLine(lines, labels);
}

export function parseGlycemic(
  lines: PdfLine[],
): GlycemicData {
  const glucoseLabels = [
    "Glicose",
    "Glicemia",
    "Glicemia de jejum",
  ];

  const glycatedHemoglobinLabels = [
    "Hemoglobina Glicada",
    "Hemoglobina Glicosilada",
    "HbA1c",
    "A1C",
  ];

  const glucoseLine = findLine(lines, glucoseLabels);
  const glycatedHemoglobinLine =
    findGlycatedHemoglobinLine(lines);

  return {
    glucose: extractFirstValueAfterLabel(
      glucoseLine,
      glucoseLabels,
    ),

    glycatedHemoglobin: extractFirstValueAfterLabel(
      glycatedHemoglobinLine,
      glycatedHemoglobinLabels,
    ),
  };
}