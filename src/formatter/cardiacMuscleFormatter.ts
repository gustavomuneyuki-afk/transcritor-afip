import type {
  CardiacMuscleData,
} from "../types/exams";

export function formatCardiacMuscle(
  data: CardiacMuscleData,
): string {
  const parts: string[] = [];

  if (data.cpk) {
    parts.push(`CPK ${data.cpk}`);
  }

  if (data.ckmb) {
    parts.push(`CK-MB ${data.ckmb}`);
  }

  if (data.troponin) {
    parts.push(`Tn ${data.troponin}`);
  }

  if (data.proBnp) {
    parts.push(`proBNP ${data.proBnp}`);
  }

  return parts.join(" / ");
}