import type { RenalData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import { RENAL_DEFINITIONS } from "./examDefinitions";
import { parseDefinitions } from "./genericExamParser";

export function parseRenal(
  lines: PdfLine[],
): RenalData {
  return parseDefinitions(
    lines,
    RENAL_DEFINITIONS,
  );
}