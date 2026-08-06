import type { LiverData } from "../types/exams";

export function formatLiver(
  data: LiverData,
): string {
  const parts: string[] = [];

  if (data.ast) {
    parts.push(`TGO ${data.ast}`);
  }

  if (data.alt) {
    parts.push(`TGP ${data.alt}`);
  }

  if (data.ggt) {
    parts.push(`GGT ${data.ggt}`);
  }

  if (data.alkalinePhosphatase) {
    parts.push(`FA ${data.alkalinePhosphatase}`);
  }

  if (data.totalBilirubin) {
    parts.push(`BT ${data.totalBilirubin}`);
  }

  if (data.directBilirubin) {
    parts.push(`BD ${data.directBilirubin}`);
  }

  if (data.indirectBilirubin) {
    parts.push(`BI ${data.indirectBilirubin}`);
  }

  if (data.albumin) {
    parts.push(`Alb ${data.albumin}`);
  }

  if (data.totalProtein) {
    parts.push(`PTN ${data.totalProtein}`);
  }

  return parts.join(" / ");
}