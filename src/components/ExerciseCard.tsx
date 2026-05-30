import { MUSCLE_COLOR } from "../data/program";
import type { Exercise } from "../types";
import WeightLogger from "./WeightLogger";

export default function ExerciseCard({
  exercise,
  index,
  total,
  nextLabel,
  accent,
  peek,
}: {
  exercise: Exercise;
  index: number;
  total: number;
  nextLabel: string;
  accent: string;
  peek: number;
}) {
  const color = MUSCLE_COLOR[exercise.muscle];

  return (
    <section
      className="snap-start px-4 pt-4 flex flex-col"
      style={{ minHeight: `calc(100% - ${peek}px)` }}
    >
      <div className="flex-1 flex flex-col rounded-2xl bg-card border border-border overflow-hidden">
        {/* Accent stripe at top of card */}
        <div className="h-1.5 w-full" style={{ backgroundColor: color }} />

        <div className="flex-1 flex flex-col p-5">
          {/* Top — identity */}
          <div>
            <div className="flex items-center justify-between">
              <span className="font-cond font-bold uppercase tracking-[0.2em] text-xs text-text-mute">
                {index + 1} / {total}
              </span>
              <span
                className="font-cond font-bold uppercase tracking-[0.15em] text-[11px] px-2 py-0.5 rounded text-text-dim border border-border"
              >
                {exercise.role}
              </span>
            </div>

            <h2 className="font-cond font-black uppercase tracking-wide text-4xl leading-[0.95] mt-2 text-text">
              {exercise.name}
            </h2>

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span
                className="font-cond font-bold uppercase tracking-wider text-xs px-2.5 py-1 rounded-full text-bg"
                style={{ backgroundColor: color }}
              >
                {exercise.muscle}
              </span>
              <span className="font-cond font-bold uppercase tracking-wide text-base text-text">
                {exercise.scheme}
              </span>
            </div>

            {exercise.note && (
              <p className="font-body text-sm text-text-dim mt-2">{exercise.note}</p>
            )}
          </div>

          {/* Middle — weight logger */}
          <div className="flex-1 flex flex-col justify-center py-4">
            <WeightLogger exerciseId={exercise.id} accent={accent} />
          </div>

          {/* Bottom — next cue */}
          <div className="pt-1">
            <p className="font-cond font-bold uppercase tracking-[0.15em] text-xs text-text-mute">
              Next · {nextLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
