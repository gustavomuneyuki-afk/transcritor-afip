import type {
  CoagulationData,
} from "../types/exams";

export function formatCoagulation(
  data: CoagulationData,
): string {
  const parts: string[] = [];

  if (data.prothrombinTime) {
    parts.push(
      `TP ${data.prothrombinTime}`,
    );
  }

  if (data.inr) {
    parts.push(
      `INR ${data.inr}`,
    );
  }

  if (data.aptt) {
    parts.push(
      `TTPa ${data.aptt}`,
    );
  }

  if (data.fibrinogen) {
    parts.push(
      `Fib ${data.fibrinogen}`,
    );
  }

  if (data.dDimer) {
    parts.push(
      `D-dímero ${data.dDimer}`,
    );
  }

  return parts.join(" / ");
}