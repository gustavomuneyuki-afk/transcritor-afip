import type { VitaminMetabolismData } from "../types/exams";

export function formatVitaminMetabolism(data: VitaminMetabolismData): string {
  const parts: string[] = [];
  if (data.iron) parts.push(`Fe ${data.iron}`);
  if (data.transferrin) parts.push(`Transf ${data.transferrin}`);
  if (data.transferrinSaturation) parts.push(`Sat Transf ${data.transferrinSaturation}%`);
  if (data.vitaminB12) parts.push(`B12 ${data.vitaminB12}`);
  if (data.folate) parts.push(`Fol ${data.folate}`);
  if (data.vitaminD) parts.push(`25-Vit D ${data.vitaminD}`);
  if (data.vitaminD125) parts.push(`1,25-Vit D ${data.vitaminD125}`);
  if (data.zinc) parts.push(`Zn ${data.zinc}`);
  return parts.join(" / ");
}
