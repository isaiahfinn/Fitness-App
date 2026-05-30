export type Muscle =
  | "back"
  | "chest"
  | "biceps"
  | "triceps"
  | "quads"
  | "glutes"
  | "hamstrings"
  | "power"
  | "cardio"
  | "core"
  | "calves"
  | "shoulders";

export type Role = "main" | "accessory" | "power";

export type StationType = "time" | "reps" | "cals" | "distance";

export interface Exercise {
  id: string;
  name: string;
  muscle: Muscle;
  role: Role;
  scheme: string;
  note: string;
}

export interface Station {
  name: string;
  muscle: Muscle;
  type: StationType;
  target: number;
  note: string;
}

export interface Finisher {
  rounds: number;
  stations: Station[];
}

export type Tag = "LOWER" | "UPPER" | "CARDIO" | "CORE";

export interface Day {
  id: number;
  tag: Tag;
  name: string;
  schedule: string;
  accent: string;
  exercises: Exercise[];
  finisher: Finisher;
}
