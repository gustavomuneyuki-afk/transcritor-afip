import type { ExamResult } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import { parseElectrolytes } from "./electrolyteParser";
import { parseGlycemic } from "./glycemicParser";
import { parseHemogram } from "./hemogramParser";
import { parseLipidProfile } from "./lipidProfileParser";
import { parseRenal } from "./renalParser";

export function parseAllExams(
  lines: PdfLine[],
): ExamResult {
  return {
    hemogram: parseHemogram(lines),
    glycemic: parseGlycemic(lines),
    renal: parseRenal(lines),
    lipid: parseLipidProfile(lines),
    electrolytes: parseElectrolytes(lines),
  };
}