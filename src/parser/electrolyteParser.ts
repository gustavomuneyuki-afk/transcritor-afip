import type { ElectrolyteData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import { ELECTROLYTE_DEFINITIONS } from "../definitions";
import { parseDefinitions } from "./genericExamParser";

export function parseElectrolytes(
  lines: PdfLine[],
): ElectrolyteData {
  return parseDefinitions(
    lines,
    ELECTROLYTE_DEFINITIONS,
  );
}