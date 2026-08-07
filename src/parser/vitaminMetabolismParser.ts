import type { VitaminMetabolismData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import { VITAMIN_METABOLISM_DEFINITIONS } from "../definitions";
import { parseDefinitions } from "./genericExamParser";

export function parseVitaminMetabolism(
  lines: PdfLine[],
): VitaminMetabolismData {
  return parseDefinitions(
    lines,
    VITAMIN_METABOLISM_DEFINITIONS,
  );
}