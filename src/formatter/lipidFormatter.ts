import type { LipidData } from "../types/exams";

export function formatLipid(
  data: LipidData,
): string {
  const parts: string[] = [];

  if (data.totalCholesterol) {
    parts.push(`CT ${data.totalCholesterol}`);
  }

  if (data.hdl) {
    parts.push(`HDL ${data.hdl}`);
  }

  if (data.ldl) {
    parts.push(`LDL ${data.ldl}`);
  }

  if (data.vldl) {
    parts.push(`VLDL ${data.vldl}`);
  }

  if (data.triglycerides) {
    parts.push(`TGL ${data.triglycerides}`);
  }

  return parts.join(" / ");
}