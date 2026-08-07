import type {
  TumorMarkerData,
} from "../types/exams";

import type {
  PdfLine,
} from "../utils/pdfReader";

import {
  TUMOR_MARKER_DEFINITIONS,
} from "../definitions";

import {
  parseDefinitions,
} from "./genericExamParser";

import {
  normalizeText,
} from "./parserUtils";

function parsePsaFreeTotalRatio(
  lines: PdfLine[],
): string | undefined {
  const line = lines.find((currentLine) => {
    const text =
      normalizeText(currentLine.text);

    return (
      text.startsWith(
        "relacao psa livre / total",
      ) ||
      text.startsWith(
        "relacao psa livre/total",
      )
    );
  });

  if (!line) {
    return undefined;
  }

  const normalized =
    normalizeText(line.text);

  const numberMatch =
    line.text.match(
      /\d+(?:[.,]\d+)?/,
    );

  if (!numberMatch) {
    return undefined;
  }

  const value =
    numberMatch[0];

  if (
    normalized.includes(
      "igual ou superior",
    ) ||
    normalized.includes(
      "maior ou igual",
    )
  ) {
    return `>=${value}%`;
  }

  if (
    normalized.includes(
      "igual ou inferior",
    ) ||
    normalized.includes(
      "menor ou igual",
    )
  ) {
    return `<=${value}%`;
  }

  if (
    normalized.includes("superior") ||
    normalized.includes("maior que")
  ) {
    return `>${value}%`;
  }

  if (
    normalized.includes("inferior") ||
    normalized.includes("menor que")
  ) {
    return `<${value}%`;
  }

  return `${value}%`;
}

export function parseTumorMarkers(
  lines: PdfLine[],
): TumorMarkerData {
  const values =
    parseDefinitions(
      lines,
      TUMOR_MARKER_DEFINITIONS,
    );

  return {
    afp:
      values.afp,

    psaTotal:
      values.psaTotal,

    psaFree:
      values.psaFree,

    psaFreeTotalRatio:
      parsePsaFreeTotalRatio(lines),
  };
}