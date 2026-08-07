import type { ExamResult } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import {
  parseCardiacMuscle,
} from "./cardiacMuscleParser";

import {
  parseCoagulation,
} from "./coagulationParser";

import {
  parseElectrolytes,
} from "./electrolyteParser";

import {
  parseGlycemic,
} from "./glycemicParser";

import {
  parseHemogram,
} from "./hemogramParser";

import {
  parseHormones,
} from "./hormoneParser";

import {
  parseInflammatory,
} from "./inflammatoryParser";

import {
  parseLipidProfile,
} from "./lipidProfileParser";

import {
  parseLiver,
} from "./liverParser";

import {
  parseRenal,
} from "./renalParser";

import {
  parseVitaminMetabolism,
} from "./vitaminMetabolismParser";

import {
  parseUrinalysis,
} from "./urinalysisParser";

export function parseAllExams(
  lines: PdfLine[],
): ExamResult {
  return {
    hemogram:
      parseHemogram(lines),

    glycemic:
      parseGlycemic(lines),

    renal:
      parseRenal(lines),

    lipid:
      parseLipidProfile(lines),

    electrolytes:
      parseElectrolytes(lines),

    liver:
      parseLiver(lines),

    inflammatory:
      parseInflammatory(lines),

    hormones:
      parseHormones(lines),

    vitaminMetabolism:
      parseVitaminMetabolism(lines),

    cardiacMuscle:
      parseCardiacMuscle(lines),

    coagulation:
      parseCoagulation(lines),
    urinalysis:
     parseUrinalysis(lines),
      
  };
}