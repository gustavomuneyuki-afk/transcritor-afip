import type {
  ExamResult,
} from "../types/exams";

import {
  formatCardiacMuscle,
} from "./cardiacMuscleFormatter";

import {
  formatCoagulation,
} from "./coagulationFormatter";

import {
  formatElectrolytes,
} from "./electrolyteFormatter";

import {
  formatGlycemic,
} from "./glycemicFormatter";

import {
  formatHemogram,
} from "./hemogramFormatter";

import {
  formatHormones,
} from "./hormoneFormatter";

import {
  formatInflammatory,
} from "./inflammatoryFormatter";

import {
  formatLipid,
} from "./lipidFormatter";

import {
  formatLiver,
} from "./liverFormatter";

import {
  formatRenal,
} from "./renalFormatter";

import {
  formatVitaminMetabolism,
} from "./vitaminMetabolismFormatter";

import {
  formatTumorMarkers,
} from "./tumorMarkerFormatter";

import {
  formatUrineProtein,
} from "./urineProteinFormatter";

import {
  formatUrinalysis,
} from "./urinalysisFormatter";

export function formatAllExams(
  exams: ExamResult,
): string {
  const groups = [
    formatHemogram(
      exams.hemogram,
    ),

    formatGlycemic(
      exams.glycemic,
    ),

    formatRenal(
      exams.renal,
    ),

    formatLipid(
      exams.lipid,
    ),

    formatElectrolytes(
      exams.electrolytes,
    ),

    formatLiver(
      exams.liver,
    ),

    formatInflammatory(
      exams.inflammatory,
    ),

    formatHormones(
      exams.hormones,
    ),

    formatVitaminMetabolism(
      exams.vitaminMetabolism,
    ),

    formatCardiacMuscle(
      exams.cardiacMuscle,
    ),

    formatCoagulation(
      exams.coagulation,
    ),
    
 formatTumorMarkers(
  exams.tumorMarkers,
),

formatUrineProtein(
  exams.urineProtein,
),

formatUrinalysis(
  exams.urinalysis,
),
    
  ].filter(
    (group) =>
      group.trim().length > 0,
  );

  return groups.join(" | ");
}