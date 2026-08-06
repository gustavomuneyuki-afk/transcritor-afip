import type { GlycemicData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import { GLYCEMIC_DEFINITIONS } from "../definitions";
import { parseDefinitions } from "./genericExamParser";

export function parseGlycemic(
  lines: PdfLine[],
): GlycemicData {
  return parseDefinitions(
    lines,
    GLYCEMIC_DEFINITIONS,
  );
}