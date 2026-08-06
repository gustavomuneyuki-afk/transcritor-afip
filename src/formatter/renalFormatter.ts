import type { RenalData } from "../types/exams.ts";

export function formatRenal(data: RenalData): string {
  const parts: string[] = [];

  if (data.urea) {
    parts.push(`Ur ${data.urea}`);
  }

  if (data.creatinine) {
    let creatinineText = `Cr ${data.creatinine}`;

    if (data.estimatedGfr) {
      creatinineText += ` (TFG ${data.estimatedGfr})`;
    }

    parts.push(creatinineText);
  } else if (data.estimatedGfr) {
    parts.push(`TFG ${data.estimatedGfr}`);
  }

  return parts.join(" / ");
}
