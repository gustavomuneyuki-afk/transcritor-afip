import type { InflammatoryData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import { INFLAMMATORY_DEFINITIONS } from "../definitions";
import { parseDefinitions } from "./genericExamParser";

export function parseInflammatory(
  lines: PdfLine[],
): InflammatoryData {
  return parseDefinitions(
    lines,
    INFLAMMATORY_DEFINITIONS,
  );
}