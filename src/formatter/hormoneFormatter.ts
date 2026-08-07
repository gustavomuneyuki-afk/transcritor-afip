import type { HormoneData } from "../types/exams";

export function formatHormones(
  data: HormoneData,
): string {
  const parts: string[] = [];

  if (data.tsh) {
    parts.push(`TSH ${data.tsh}`);
  }

  if (data.freeT4) {
    parts.push(`T4L ${data.freeT4}`);
  }

  if (data.acth) {
    parts.push(`ACTH ${data.acth}`);
  }

  if (data.cortisol) {
    parts.push(`Cort ${data.cortisol}`);
  }

  if (data.pth) {
    parts.push(`PTH ${data.pth}`);
  }

  return parts.join(" / ");
}