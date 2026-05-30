import type { Day, Muscle } from "../types";

// Tier 2 — specific muscle tag colours. cardio/core share the group colours.
export const MUSCLE_COLOR: Record<Muscle, string> = {
  back: "#5BA4E6",
  chest: "#E55A4E",
  biceps: "#A07FD4",
  triceps: "#3ABFB1",
  quads: "#E8924A",
  glutes: "#D45C7E",
  hamstrings: "#7BAE6E",
  power: "#D4A844",
  cardio: "#AAFF00",
  core: "#9955FF",
  calves: "#B08968",
  shoulders: "#C765A8",
};

export const PROGRAM: Day[] = [
  {
    id: 1,
    tag: "LOWER",
    name: "Deadlift Day",
    schedule: "Mon",
    accent: "#FF8800",
    exercises: [
      { id: "deadlift", name: "Deadlift", muscle: "hamstrings", role: "main", scheme: "4 × 3–5", note: "Top set RPE 8 · rest 3–4 min" },
      { id: "leg-press-vol", name: "Leg Press", muscle: "quads", role: "main", scheme: "3 × 6–8", note: "RPE 8 · rest 2–3 min" },
      { id: "step-up", name: "Step-Ups Into Box", muscle: "quads", role: "accessory", scheme: "3 × 8/leg", note: "Weighted" },
      { id: "glute-bridge", name: "Weighted Glute Bridge", muscle: "glutes", role: "accessory", scheme: "3 × 8–10", note: "Drive through heels" },
      { id: "leg-curl", name: "Seated Leg Curl", muscle: "hamstrings", role: "accessory", scheme: "3 × 10–12", note: "" },
      { id: "face-pull", name: "Face Pull", muscle: "shoulders", role: "accessory", scheme: "3 × 12–15", note: "Elbows high · slow reps" },
    ],
    finisher: {
      rounds: 3,
      stations: [
        { name: "Ski Erg", muscle: "cardio", type: "time", target: 45, note: "Hard" },
        { name: "Weighted Sit-Ups", muscle: "core", type: "reps", target: 12, note: "Plate on chest" },
        { name: "Standing Calf Raise", muscle: "calves", type: "reps", target: 15, note: "" },
      ],
    },
  },
  {
    id: 2,
    tag: "UPPER",
    name: "Bench Day",
    schedule: "Tue",
    accent: "#00C8FF",
    exercises: [
      { id: "bench", name: "Bench Press", muscle: "chest", role: "main", scheme: "4 × 3–5", note: "Top set RPE 8 · rest 3 min" },
      { id: "lat-pulldown", name: "Lat Pulldown", muscle: "back", role: "main", scheme: "4 × 5–6", note: "Heavy · rest 2–3 min" },
      { id: "incline-press", name: "Incline DB Press", muscle: "chest", role: "accessory", scheme: "3 × 6–8", note: "" },
      { id: "cable-row-tue", name: "Seated Cable Row", muscle: "back", role: "accessory", scheme: "3 × 8–10", note: "" },
      { id: "db-curl", name: "DB Curl", muscle: "biceps", role: "accessory", scheme: "3 × 8–10", note: "Superset with triceps" },
      { id: "tri-pushdown", name: "Triceps Pushdown", muscle: "triceps", role: "accessory", scheme: "3 × 10–12", note: "Superset with curl" },
    ],
    finisher: {
      rounds: 3,
      stations: [
        { name: "Bike Erg", muscle: "cardio", type: "cals", target: 15, note: "12–15 cal" },
        { name: "Hanging Leg Raise", muscle: "core", type: "reps", target: 12, note: "" },
        { name: "DB Shoulder Press", muscle: "shoulders", type: "reps", target: 10, note: "" },
        { name: "Band Pull-Apart", muscle: "shoulders", type: "reps", target: 20, note: "Arms straight" },
      ],
    },
  },
  {
    id: 3,
    tag: "LOWER",
    name: "Squat-Pattern Day",
    schedule: "Thu",
    accent: "#FF8800",
    exercises: [
      { id: "box-jump", name: "Box Jumps", muscle: "power", role: "power", scheme: "4 × 3", note: "Explosive · full reset" },
      { id: "leg-press-heavy", name: "Leg Press", muscle: "quads", role: "main", scheme: "4 × 5–6", note: "Heavy · rest 3 min" },
      { id: "goblet-squat", name: "Goblet Squat", muscle: "quads", role: "accessory", scheme: "3 × 10–12", note: "DB at chest · sub if no machine" },
      { id: "rdl", name: "Romanian Deadlift", muscle: "hamstrings", role: "main", scheme: "3 × 6–8", note: "Lighter hinge" },
      { id: "swiss-ball-curl", name: "Swiss Ball Leg Curl", muscle: "hamstrings", role: "accessory", scheme: "3 × 10–12", note: "Hips stay high" },
      { id: "glute-bridge-2", name: "Weighted Glute Bridge", muscle: "glutes", role: "accessory", scheme: "3 × 12–15", note: "Load it" },
    ],
    finisher: {
      rounds: 3,
      stations: [
        { name: "Row Erg", muscle: "cardio", type: "distance", target: 200, note: "Metres" },
        { name: "Ab Wheel Rollout", muscle: "core", type: "reps", target: 10, note: "" },
        { name: "Step Calf Raise", muscle: "calves", type: "reps", target: 15, note: "Per leg · off the box" },
      ],
    },
  },
  {
    id: 4,
    tag: "UPPER",
    name: "Pull + Volume Day",
    schedule: "Fri",
    accent: "#00C8FF",
    exercises: [
      { id: "lat-pulldown-vol", name: "Lat Pulldown", muscle: "back", role: "main", scheme: "4 × 6–8", note: "Volume day" },
      { id: "bench-vol", name: "Bench Press", muscle: "chest", role: "main", scheme: "4 × 6–8", note: "Volume day" },
      { id: "push-up", name: "Push-Ups", muscle: "chest", role: "accessory", scheme: "3 × AMRAP", note: "Add weight if easy" },
      { id: "cable-row-fri", name: "Seated Cable Row", muscle: "back", role: "accessory", scheme: "3 × 8–10", note: "" },
      { id: "hammer-curl", name: "Hammer Curl", muscle: "biceps", role: "accessory", scheme: "3 × 10–12", note: "Superset with triceps" },
      { id: "oh-tri-ext", name: "Overhead Triceps Ext.", muscle: "triceps", role: "accessory", scheme: "3 × 10–12", note: "Superset with curl" },
    ],
    finisher: {
      rounds: 3,
      stations: [
        { name: "Treadmill", muscle: "cardio", type: "time", target: 45, note: "Hard run" },
        { name: "V-Ups", muscle: "core", type: "reps", target: 12, note: "" },
        { name: "DB Lateral Raise", muscle: "shoulders", type: "reps", target: 12, note: "" },
        { name: "Band Pull-Apart", muscle: "shoulders", type: "reps", target: 20, note: "Arms straight" },
      ],
    },
  },
];
