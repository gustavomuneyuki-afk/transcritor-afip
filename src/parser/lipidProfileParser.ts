import type { LipidData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import { LIPID_DEFINITIONS } from "../definitions";
import { parseDefinitions } from "./genericExamParser";

export function parseLipidProfile(
  lines: PdfLine[],
): LipidData {
  return parseDefinitions(
    lines,
    LIPID_DEFINITIONS,
  );
}