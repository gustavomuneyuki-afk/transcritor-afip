import type { ElectrolyteData } from "../types/exams";

export function formatElectrolytes(
  data: ElectrolyteData,
): string {
  const parts: string[] = [];

  if (data.uricAcid) {
    parts.push(`Ác úrico ${data.uricAcid}`);
  }

  if (data.sodium) {
    parts.push(`Na ${data.sodium}`);
  }

  if (data.potassium) {
    parts.push(`K ${data.potassium}`);
  }

  if (data.phosphorus) {
    parts.push(`P ${data.phosphorus}`);
  }

  if (data.magnesium) {
    parts.push(`Mg ${data.magnesium}`);
  }

  if (data.ionizedCalcium) {
    parts.push(`Ca I ${data.ionizedCalcium}`);
  }

  return parts.join(" / ");
}