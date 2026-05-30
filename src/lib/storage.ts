const KEY = "weightLog";

export type WeightLog = Record<string, number>;

export function readLog(): WeightLog {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as WeightLog) : {};
  } catch {
    return {};
  }
}

export function getWeight(exerciseId: string): number | null {
  const log = readLog();
  return typeof log[exerciseId] === "number" ? log[exerciseId] : null;
}

export function saveWeight(exerciseId: string, weight: number): void {
  const log = readLog();
  log[exerciseId] = weight;
  try {
    localStorage.setItem(KEY, JSON.stringify(log));
  } catch {
    // ignore write failures (e.g. private mode)
  }
}
