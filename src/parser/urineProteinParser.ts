import type {
  UrineProteinData,
} from "../types/exams";

import type {
  PdfLine,
} from "../utils/pdfReader";

import {
  URINE_PROTEIN_DEFINITIONS,
} from "../definitions";

import {
  parseDefinitions,
} from "./genericExamParser";

import {
  normalizeText,
} from "./parserUtils";

function findMicroalbuminuriaSection(
  lines: PdfLine[],
): PdfLine[] {
  const startIndex = lines.findIndex(
    (line) =>
      normalizeText(line.text) ===
      "microalbuminuria",
  );

  if (startIndex === -1) {
    return [];
  }

  const startPage =
    lines[startIndex].page;

  const section: PdfLine[] = [];

  for (
    let index = startIndex + 1;
    index < lines.length;
    index += 1
  ) {
    const line = lines[index];

    if (line.page !== startPage) {
      break;
    }

    const text =
      normalizeText(line.text);

    if (
      text.startsWith("liberado por") ||
      text.startsWith("pedido :") ||
      text.startsWith("assinatura digital")
    ) {
      break;
    }

    section.push(line);
  }

  return section;
}

function extractNumericValue(
  lines: PdfLine[],
  labels: string[],
): string | undefined {
  for (const line of lines) {
    const normalizedLine =
      normalizeText(line.text);

    const matchedLabel =
      labels.find((label) =>
        normalizedLine.startsWith(
          normalizeText(label),
        ),
      );

    if (!matchedLabel) {
      continue;
    }

    const numberMatch =
      line.text.match(
        /\d+(?:[.,]\d+)?/,
      );

    if (numberMatch) {
      return numberMatch[0];
    }
  }

  return undefined;
}

export function parseUrineProtein(
  lines: PdfLine[],
): UrineProteinData {
  const genericValues =
    parseDefinitions(
      lines,
      URINE_PROTEIN_DEFINITIONS,
    );

  const microalbuminuriaSection =
    findMicroalbuminuriaSection(lines);

  return {
    urineProtein:
      genericValues.urineProtein,

    urineCreatinine:
      extractNumericValue(
        microalbuminuriaSection,
        [
          "Creatinina, urina",
        ],
      ),

    urineAlbumin:
      extractNumericValue(
        microalbuminuriaSection,
        [
          "Albumina, urina",
        ],
      ),

    albuminCreatinineRatio:
      extractNumericValue(
        microalbuminuriaSection,
        [
          "Relação albumina/creatinina, urina",
          "Relacao albumina/creatinina, urina",
        ],
      ),

    /*
     * Ainda não validado em PDF real.
     */
    proteinCreatinineRatio:
      undefined,
  };
}