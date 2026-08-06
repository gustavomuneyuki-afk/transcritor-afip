import type { ExamResult } from "../types/exams";

import { formatElectrolytes } from "./electrolyteFormatter";
import { formatGlycemic } from "./glycemicFormatter";
import { formatHemogram } from "./hemogramFormatter";
import { formatLipid } from "./lipidFormatter";
import { formatRenal } from "./renalFormatter";

export function formatAllExams(
  exams: ExamResult,
): string {
  const groups = [
    formatHemogram(exams.hemogram),
    formatGlycemic(exams.glycemic),
    formatRenal(exams.renal),
    formatLipid(exams.lipid),
    formatElectrolytes(exams.electrolytes),
  ].filter((group) => group.trim().length > 0);

  return groups.join(" | ");
}