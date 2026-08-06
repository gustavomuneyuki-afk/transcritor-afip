import type { LiverData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import { LIVER_DEFINITIONS } from "../definitions";
import { parseDefinitions } from "./genericExamParser";

export function parseLiver(
  lines: PdfLine[],
): LiverData {
  return parseDefinitions(
    lines,
    LIVER_DEFINITIONS,
  );
}