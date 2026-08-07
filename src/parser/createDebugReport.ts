import type { ExamResult } from "../types/exams";

import type {
  DebugExamStatus,
  DebugReport,
} from "../types/debug";

function createStatus(
  key: string,
  label: string,
  value: string | number | undefined,
): DebugExamStatus {
  const found =
    value !== undefined &&
    value !== null &&
    String(value).trim().length > 0;

  return {
    key,
    label,
    found,
    value: found ? String(value) : undefined,
    message: found
      ? `${label}: ${value}`
      : `${label} não encontrado`,
  };
}

export function createDebugReport(
  exams: ExamResult,
  pageCount: number,
  lineCount: number,
): DebugReport {
  const statuses: DebugExamStatus[] = [
    createStatus(
      "hemoglobin",
      "Hemoglobina",
      exams.hemogram.hemoglobin,
    ),

    createStatus(
      "hematocrit",
      "Hematócrito",
      exams.hemogram.hematocrit,
    ),

    createStatus(
      "leukocytes",
      "Leucócitos",
      exams.hemogram.leukocytes,
    ),

    createStatus(
      "neutrophils",
      "Neutrófilos",
      exams.hemogram.neutrophils,
    ),

    createStatus(
      "lymphocytes",
      "Linfócitos",
      exams.hemogram.lymphocytes,
    ),

    createStatus(
      "platelets",
      "Plaquetas",
      exams.hemogram.platelets,
    ),
    createStatus(
  "reticulocytesAbsolute",
  "Reticulócitos absolutos",
  exams.hemogram.reticulocytesAbsolute,
),

createStatus(
  "reticulocytesRelative",
  "Reticulócitos relativos",
  exams.hemogram.reticulocytesRelative,
),

    createStatus(
      "glucose",
      "Glicose",
      exams.glycemic.glucose,
    ),

    createStatus(
      "glycatedHemoglobin",
      "HbA1c",
      exams.glycemic.glycatedHemoglobin,
    ),

    createStatus(
      "urea",
      "Ureia",
      exams.renal.urea,
    ),

    createStatus(
      "creatinine",
      "Creatinina",
      exams.renal.creatinine,
    ),

    createStatus(
      "estimatedGfr",
      "TFG",
      exams.renal.estimatedGfr,
    ),

    createStatus(
      "totalCholesterol",
      "Colesterol total",
      exams.lipid.totalCholesterol,
    ),

    createStatus(
      "hdl",
      "HDL",
      exams.lipid.hdl,
    ),

    createStatus(
      "ldl",
      "LDL",
      exams.lipid.ldl,
    ),

    createStatus(
      "vldl",
      "VLDL",
      exams.lipid.vldl,
    ),

    createStatus(
      "triglycerides",
      "Triglicérides",
      exams.lipid.triglycerides,
    ),

    createStatus(
      "uricAcid",
      "Ácido úrico",
      exams.electrolytes.uricAcid,
    ),

    createStatus(
      "sodium",
      "Sódio",
      exams.electrolytes.sodium,
    ),

    createStatus(
      "potassium",
      "Potássio",
      exams.electrolytes.potassium,
    ),

    createStatus(
      "phosphorus",
      "Fósforo",
      exams.electrolytes.phosphorus,
    ),

    createStatus(
      "magnesium",
      "Magnésio",
      exams.electrolytes.magnesium,
    ),

    createStatus(
      "ionizedCalcium",
      "Cálcio ionizado",
      exams.electrolytes.ionizedCalcium,
    ),

    createStatus(
      "ast",
      "TGO/AST",
      exams.liver.ast,
    ),

    createStatus(
      "alt",
      "TGP/ALT",
      exams.liver.alt,
    ),

    createStatus(
      "ggt",
      "GGT",
      exams.liver.ggt,
    ),

    createStatus(
      "alkalinePhosphatase",
      "Fosfatase alcalina",
      exams.liver.alkalinePhosphatase,
    ),

    createStatus(
      "totalBilirubin",
      "Bilirrubina total",
      exams.liver.totalBilirubin,
    ),

    createStatus(
      "directBilirubin",
      "Bilirrubina direta",
      exams.liver.directBilirubin,
    ),

    createStatus(
      "indirectBilirubin",
      "Bilirrubina indireta",
      exams.liver.indirectBilirubin,
    ),

    createStatus(
      "albumin",
      "Albumina",
      exams.liver.albumin,
    ),

    createStatus(
      "totalProtein",
      "Proteínas totais",
      exams.liver.totalProtein,
    ),

    createStatus(
      "crp",
      "PCR",
      exams.inflammatory.crp,
    ),

    createStatus(
      "procalcitonin",
      "Procalcitonina",
      exams.inflammatory.procalcitonin,
    ),

    createStatus(
      "esr",
      "VHS",
      exams.inflammatory.esr,
    ),

    createStatus(
      "ferritin",
      "Ferritina",
      exams.inflammatory.ferritin,
    ),

    createStatus(
      "tsh",
      "TSH",
      exams.hormones.tsh,
    ),

    createStatus(
      "freeT4",
      "T4 Livre",
      exams.hormones.freeT4,
    ),

    createStatus(
      "acth",
      "ACTH",
      exams.hormones.acth,
    ),

    createStatus(
      "cortisol",
      "Cortisol",
      exams.hormones.cortisol,
    ),

    createStatus(
      "pth",
      "PTH",
      exams.hormones.pth,
    ),
    createStatus(
  "iron",
  "Ferro",
  exams.vitaminMetabolism.iron,
),

createStatus(
  "transferrin",
  "Transferrina",
  exams.vitaminMetabolism.transferrin,
),

createStatus(
  "transferrinSaturation",
  "Saturação da transferrina",
  exams.vitaminMetabolism.transferrinSaturation,
),

createStatus(
  "vitaminB12",
  "Vitamina B12",
  exams.vitaminMetabolism.vitaminB12,
),

createStatus(
  "folate",
  "Ácido fólico",
  exams.vitaminMetabolism.folate,
),

createStatus(
  "vitaminD",
  "25-OH Vitamina D",
  exams.vitaminMetabolism.vitaminD,
),

createStatus(
  "zinc",
  "Zinco",
  exams.vitaminMetabolism.zinc,
),
  ];

  return {
    pageCount,
    lineCount,
    exams: statuses,
  };
}