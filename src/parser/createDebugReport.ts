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
  ];

  return {
    pageCount,
    lineCount,
    exams: statuses,
  };
}