import type { HormoneData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import { HORMONE_DEFINITIONS } from "../definitions";
import { parseDefinitions } from "./genericExamParser";

export function parseHormones(
  lines: PdfLine[],
): HormoneData {
  return parseDefinitions(
    lines,
    HORMONE_DEFINITIONS,
  );
}