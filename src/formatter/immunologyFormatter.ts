import type { ImmunologyData } from "../types/exams";

export function formatImmunology(data: ImmunologyData): string {
  const parts: string[] = [];

  if (data.igG) parts.push(`IgG ${data.igG}`);
  if (data.igA) parts.push(`IgA ${data.igA}`);
  if (data.igM) parts.push(`IgM ${data.igM}`);
  if (data.igE) parts.push(`IgE ${data.igE}`);
  if (data.c3) parts.push(`C3 ${data.c3}`);
  if (data.c4) parts.push(`C4 ${data.c4}`);
  if (data.antiSsa) parts.push(`Anti-SSA ${data.antiSsa}`);
  if (data.antiSsb) parts.push(`Anti-SSB ${data.antiSsb}`);
  if (data.antiSm) parts.push(`Anti-Sm ${data.antiSm}`);

  return parts.join(" / ");
}
