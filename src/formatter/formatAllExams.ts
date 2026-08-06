import type { ExamResult } from "../types/exams";

import { formatGlycemic } from "./glycemicFormatter";
import { formatHemogram } from "./hemogramFormatter";
import { formatRenal } from "./renalFormatter";

export function formatAllExams(
  exams: ExamResult,
): string {
  const groups = [
    formatHemogram(exams.hemogram),
    formatGlycemic(exams.glycemic),
    formatRenal(exams.renal),
  ].filter((group) => group.length > 0);

  return groups.join(" | ");
}