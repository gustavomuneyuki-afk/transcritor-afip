import type { RenalData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import { RENAL_DEFINITIONS } from "../definitions";
import { parseDefinitions } from "./genericExamParser";
import { normalizeText } from "./parserUtils";

function isEstimatedGfrNotCalculated(
  lines: PdfLine[],
): boolean {
  const labels =
    RENAL_DEFINITIONS.estimatedGfr.labels;

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
    return false;
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

    const normalizedCandidate =
      normalizeText(candidate.text);

    if (
      normalizedCandidate.startsWith(
        "resultado nao calculado",
      )
    ) {
      return true;
    }
  }

  return false;
}

export function parseRenal(
  lines: PdfLine[],
): RenalData {
  const values = parseDefinitions(
    lines,
    RENAL_DEFINITIONS,
  );

  if (
    isEstimatedGfrNotCalculated(lines)
  ) {
    return {
      ...values,
      estimatedGfr: undefined,
    };
  }

  return values;
}
