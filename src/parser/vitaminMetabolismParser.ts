import type {
  VitaminMetabolismData,
} from "../types/exams";

import type {
  PdfLine,
} from "../utils/pdfReader";

import {
  VITAMIN_METABOLISM_DEFINITIONS,
} from "../definitions";

import {
  parseDefinitions,
} from "./genericExamParser";

import {
  normalizeText,
} from "./parserUtils";

function parseFolateComparison(
  lines: PdfLine[],
): string | undefined {
  const labels =
    VITAMIN_METABOLISM_DEFINITIONS
      .folate
      .labels;

  const headingIndex = lines.findIndex(
    (line) => {
      const normalizedLine =
        normalizeText(line.text);

      return labels.some((label) =>
        normalizedLine.startsWith(
          normalizeText(label),
        ),
      );
    },
  );

  if (headingIndex === -1) {
    return undefined;
  }

  const headingPage =
    lines[headingIndex].page;

  for (
    let offset = 1;
    offset <= 8;
    offset += 1
  ) {
    const candidate =
      lines[headingIndex + offset];

    if (
      !candidate ||
      candidate.page !== headingPage
    ) {
      break;
    }

    const text =
      candidate.text.trim();

    if (
      !normalizeText(text).startsWith(
        "resultado",
      )
    ) {
      continue;
    }

    const resultText = text
      .replace(/^Resultado\s*/i, "")
      .trim();

    const comparisonMatch =
      resultText.match(
        /^(Superior\s+ou\s+igual\s+a|Inferior\s+ou\s+igual\s+a|Superior\s+a|Inferior\s+a)\s+([\d.,]+)/i,
      );

    if (!comparisonMatch) {
      return undefined;
    }

    const comparison =
      normalizeText(
        comparisonMatch[1],
      );

    const value =
      comparisonMatch[2];

    if (
      comparison ===
      "superior ou igual a"
    ) {
      return `>=${value}`;
    }

    if (
      comparison ===
      "inferior ou igual a"
    ) {
      return `<=${value}`;
    }

    if (
      comparison === "superior a"
    ) {
      return `>${value}`;
    }

    if (
      comparison === "inferior a"
    ) {
      return `<${value}`;
    }

    return undefined;
  }

  return undefined;
}

export function parseVitaminMetabolism(
  lines: PdfLine[],
): VitaminMetabolismData {
  const values = parseDefinitions(
    lines,
    VITAMIN_METABOLISM_DEFINITIONS,
  );

  const folateComparison =
    parseFolateComparison(lines);

  return {
    ...values,

    folate:
      folateComparison ??
      values.folate,
  };
}
