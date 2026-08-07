import type { CardiacMuscleData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import {
  CARDIAC_MUSCLE_DEFINITIONS,
} from "../definitions";

import {
  parseDefinitions,
} from "./genericExamParser";

export function parseCardiacMuscle(
  lines: PdfLine[],
): CardiacMuscleData {
  return parseDefinitions(
    lines,
    CARDIAC_MUSCLE_DEFINITIONS,
  );
}