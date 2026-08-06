import type { GlycemicData } from "../types/exams";
import type { PdfLine } from "../utils/pdfReader";

import {
  extractResultAfterHeading,
} from "./parserUtils";

const GLUCOSE_LABELS = [
  "Glicose",
  "Glicemia de jejum",
  "Glicemia",
];

const GLYCATED_HEMOGLOBIN_LABELS = [
  "Hemoglobina Glicada",
  "Hemoglobina Glicosilada",
  "HbA1c",
];

export function parseGlycemic(
  lines: PdfLine[],
): GlycemicData {
  return {
    glucose: extractResultAfterHeading(
      lines,
      GLUCOSE_LABELS,
    ),

    glycatedHemoglobin: extractResultAfterHeading(
      lines,
      GLYCATED_HEMOGLOBIN_LABELS,
    ),
  };
}