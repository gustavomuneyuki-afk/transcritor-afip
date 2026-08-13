import type { GlycemicData } from "../types/exams";

export function formatGlycemic(
  data: GlycemicData,
): string {
  const parts: string[] = [];

  if (data.glucose) {
    parts.push(`Gli ${data.glucose}`);
  }

  if (data.glycatedHemoglobin) {
    parts.push(
      `HbA1c ${data.glycatedHemoglobin}%`,
    );
  }

  if (data.insulin) {
    parts.push(`Ins ${data.insulin}`);
  }

  return parts.join(" / ");
}