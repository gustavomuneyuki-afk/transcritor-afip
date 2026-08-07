import type { ExamResult } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import { parseElectrolytes } from "./electrolyteParser";
import { parseGlycemic } from "./glycemicParser";
import { parseHemogram } from "./hemogramParser";
import { parseHormones } from "./hormoneParser";
import { parseInflammatory } from "./inflammatoryParser";
import { parseLipidProfile } from "./lipidProfileParser";
import { parseLiver } from "./liverParser";
import { parseRenal } from "./renalParser";
import { parseVitaminMetabolism } from "./vitaminMetabolismParser";

export function parseAllExams(
  lines: PdfLine[],
): ExamResult {
  return {
    hemogram: parseHemogram(lines),
    glycemic: parseGlycemic(lines),
    renal: parseRenal(lines),
    lipid: parseLipidProfile(lines),
    electrolytes: parseElectrolytes(lines),
    liver: parseLiver(lines),
    inflammatory: parseInflammatory(lines),
    hormones: parseHormones(lines),
    vitaminMetabolism:
  parseVitaminMetabolism(lines),
  };
}