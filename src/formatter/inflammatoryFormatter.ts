import type { InflammatoryData } from "../types/exams";

export function formatInflammatory(
  data: InflammatoryData,
): string {
  const parts: string[] = [];

  if (data.crp) {
    parts.push(`PCR ${data.crp}`);
  }

  if (data.procalcitonin) {
    parts.push(`PCT ${data.procalcitonin}`);
  }

  if (data.esr) {
    parts.push(`VHS ${data.esr}`);
  }

  if (data.ferritin) {
    parts.push(`Ferr ${data.ferritin}`);
  }

  return parts.join(" / ");
}