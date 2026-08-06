import type { LipidData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import {
  extractFirstValueAfterLabel,
  extractResultAfterHeading,
  findLine,
} from "./parserUtils";

const TOTAL_CHOLESTEROL_LABELS = [
  "Colesterol Total",
];

const HDL_LABELS = [
  "Colesterol HDL",
  "HDL Colesterol",
  "HDL - Colesterol",
];

const LDL_LABELS = [
  "Colesterol LDL",
  "LDL Colesterol",
  "LDL - Colesterol",
];

const VLDL_LABELS = [
  "Colesterol VLDL",
  "VLDL Colesterol",
  "VLDL - Colesterol",
];

const TRIGLYCERIDE_LABELS = [
  "Triglicérides",
  "Triglicerides",
  "Triglicerídeos",
  "Triglicerideos",
];

function extractValueFromLineOrResult(
  lines: PdfLine[],
  labels: string[],
): string | undefined {
  const line = findLine(lines, labels);

  const valueFromSameLine =
    extractFirstValueAfterLabel(line, labels);

  if (valueFromSameLine) {
    return valueFromSameLine;
  }

  return extractResultAfterHeading(lines, labels);
}

export function parseLipidProfile(
  lines: PdfLine[],
): LipidData {
  return {
    totalCholesterol: extractValueFromLineOrResult(
      lines,
      TOTAL_CHOLESTEROL_LABELS,
    ),

    hdl: extractValueFromLineOrResult(
      lines,
      HDL_LABELS,
    ),

    ldl: extractValueFromLineOrResult(
      lines,
      LDL_LABELS,
    ),

    vldl: extractValueFromLineOrResult(
      lines,
      VLDL_LABELS,
    ),

    triglycerides: extractValueFromLineOrResult(
      lines,
      TRIGLYCERIDE_LABELS,
    ),
  };
}