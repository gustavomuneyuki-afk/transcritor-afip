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
      "insulin",
      "Insulina",
      exams.glycemic.insulin,
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
      "haptoglobin",
      "Haptoglobina",
      exams.inflammatory.haptoglobin,
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
    createStatus(
      "cpk",
      "CPK",
      exams.cardiacMuscle.cpk,
    ),
    createStatus(
      "ckmb",
      "CK-MB",
      exams.cardiacMuscle.ckmb,
    ),
    createStatus(
      "troponin",
      "Troponina",
      exams.cardiacMuscle.troponin,
    ),
    createStatus(
      "proBnp",
      "proBNP",
      exams.cardiacMuscle.proBnp,
    ),
    createStatus(
      "prothrombinTime",
      "TP",
      exams.coagulation.prothrombinTime,
    ),
    createStatus(
      "inr",
      "INR",
      exams.coagulation.inr,
    ),
    createStatus(
      "aptt",
      "TTPa",
      exams.coagulation.aptt,
    ),
    createStatus(
      "fibrinogen",
      "Fibrinogênio",
      exams.coagulation.fibrinogen,
    ),
    createStatus(
      "dDimer",
      "D-dímero",
      exams.coagulation.dDimer,
    ),
    createStatus(
      "urinalysisDensity",
      "U1 Densidade",
      exams.urinalysis.density,
    ),
    createStatus(
      "urinalysisPh",
      "U1 pH",
      exams.urinalysis.ph,
    ),
    createStatus(
      "urinalysisProtein",
      "U1 Proteína",
      exams.urinalysis.protein,
    ),
    createStatus(
      "urinalysisGlucose",
      "U1 Glicose",
      exams.urinalysis.glucose,
    ),
    createStatus(
      "urinalysisBilirubin",
      "U1 Bilirrubina",
      exams.urinalysis.bilirubin,
    ),
    createStatus(
      "urinalysisKetones",
      "U1 Cetona",
      exams.urinalysis.ketones,
    ),
    createStatus(
      "urinalysisBlood",
      "U1 Sangue",
      exams.urinalysis.blood,
    ),
    createStatus(
      "urinalysisNitrite",
      "U1 Nitrito",
      exams.urinalysis.nitrite,
    ),
    createStatus(
      "urinalysisUrobilinogen",
      "U1 Urobilinogênio",
      exams.urinalysis.urobilinogen,
    ),
    createStatus(
      "urinalysisEpithelialCells",
      "U1 Células epiteliais",
      exams.urinalysis.epithelialCells,
    ),
    createStatus(
      "urinalysisLeukocytes",
      "U1 Leucócitos",
      exams.urinalysis.leukocytes,
    ),
    createStatus(
      "urinalysisRedBloodCells",
      "U1 Hemácias",
      exams.urinalysis.redBloodCells,
    ),
    createStatus(
      "urinalysisCrystals",
      "U1 Cristais",
      exams.urinalysis.crystals,
    ),
    createStatus(
      "urinalysisCasts",
      "U1 Cilindros",
      exams.urinalysis.casts,
    ),
    createStatus(
      "urinalysisBacteria",
      "U1 Bactérias",
      exams.urinalysis.bacteria,
    ),
    createStatus(
      "afp",
      "AFP",
      exams.tumorMarkers.afp,
    ),
    createStatus(
      "psaTotal",
      "PSA total",
      exams.tumorMarkers.psaTotal,
    ),
    createStatus(
      "psaFree",
      "PSA livre",
      exams.tumorMarkers.psaFree,
    ),
    createStatus(
      "psaFreeTotalRatio",
      "Relação PSA livre/total",
      exams.tumorMarkers.psaFreeTotalRatio,
    ),
    createStatus(
      "urineProtein",
      "Proteína urinária",
      exams.urineProtein.urineProtein,
    ),
    createStatus(
      "urineCreatinine",
      "Creatinina urinária",
      exams.urineProtein.urineCreatinine,
    ),
    createStatus(
      "urineAlbumin",
      "Albumina urinária",
      exams.urineProtein.urineAlbumin,
    ),
    createStatus(
      "proteinCreatinineRatio",
      "Relação proteína/creatinina",
      exams.urineProtein.proteinCreatinineRatio,
    ),
    createStatus(
      "albuminCreatinineRatio",
      "Relação albumina/creatinina",
      exams.urineProtein.albuminCreatinineRatio,
    ),
  ];

  return {
    pageCount,
    lineCount,
    exams: statuses,
  };
}