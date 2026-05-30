import { useState } from "react";
import type { Finisher } from "../types";
import StationTimer from "./StationTimer";

export default function FinisherCard({
  finisher,
  accent,
  peek,
}: {
  finisher: Finisher;
  accent: string;
  peek: number;
}) {
  const [round, setRound] = useState(1);

  return (
    <section
      className="snap-start px-4 pt-4 pb-4 flex flex-col"
      style={{ minHeight: `calc(100% - ${peek}px)` }}
    >
      <div className="flex-1 flex flex-col rounded-2xl bg-card border border-border overflow-hidden">
        <div className="h-1.5 w-full" style={{ backgroundColor: accent }} />

        <div className="flex-1 flex flex-col p-5">
          {/* Header + round counter */}
          <div className="flex items-center justify-between gap-3">
            <h2
              className="font-cond font-black uppercase tracking-wide text-3xl leading-none"
              style={{ color: accent }}
            >
              Finisher
            </h2>
            <button
              onClick={() => setRound((r) => (r % finisher.rounds) + 1)}
              className="flex-none flex flex-col items-center justify-center rounded-lg px-4 active:scale-95 transition-transform"
              style={{
                minHeight: 56,
                minWidth: 92,
                border: `1px solid ${accent}`,
                boxShadow: `0 0 12px ${accent}55`,
              }}
            >
              <span className="font-cond font-bold uppercase tracking-widest text-[10px] text-text-dim">
                Round
              </span>
              <span
                className="font-cond font-black tnum text-2xl leading-none"
                style={{ color: accent }}
              >
                {round} / {finisher.rounds}
              </span>
            </button>
          </div>

          <p className="font-cond font-bold uppercase tracking-[0.2em] text-xs text-text-dim mt-1">
            {finisher.rounds} rounds · {finisher.stations.length} stations
          </p>

          {/* Stations */}
          <div className="flex flex-col gap-2.5 mt-4">
            {finisher.stations.map((s, i) => (
              <StationTimer key={`${s.name}-${i}`} station={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
