import { useEffect, useRef, useState } from "react";
import { MUSCLE_COLOR } from "../data/program";
import type { Station } from "../types";

function clock(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return m > 0 ? `${m}:${String(s).padStart(2, "0")}` : `0:${String(s).padStart(2, "0")}`;
}

export default function StationTimer({ station }: { station: Station }) {
  const color = MUSCLE_COLOR[station.muscle];
  const isTimed = station.type === "time" || station.type === "distance";
  const countUp = station.type === "distance";

  // Timed-station state
  const [seconds, setSeconds] = useState(countUp ? 0 : station.target);
  const [running, setRunning] = useState(false);
  const tick = useRef<number | null>(null);

  // Tap-to-complete state (reps / cals)
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!running) return;
    tick.current = window.setInterval(() => {
      setSeconds((s) => {
        if (countUp) return s + 1;
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (tick.current) window.clearInterval(tick.current);
    };
  }, [running, countUp]);

  function toggleTimer() {
    if (running) {
      // stop / reset
      setRunning(false);
      setSeconds(countUp ? 0 : station.target);
    } else {
      if (!countUp && seconds === 0) setSeconds(station.target);
      setRunning(true);
    }
  }

  const targetLabel =
    station.type === "time"
      ? `${station.target}s`
      : station.type === "distance"
        ? `${station.target}m`
        : station.type === "cals"
          ? `${station.target} cal`
          : `${station.target} reps`;

  return (
    <div className="rounded-xl bg-card-raised border border-border p-3.5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="font-cond font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full text-bg"
              style={{ backgroundColor: color }}
            >
              {station.muscle}
            </span>
            <span className="font-cond font-bold uppercase tracking-wide text-sm text-text-dim">
              {targetLabel}
            </span>
          </div>
          <h4 className="font-cond font-bold uppercase tracking-wide text-xl leading-tight mt-1 text-text truncate">
            {station.name}
          </h4>
          {station.note && (
            <p className="font-body text-xs text-text-dim mt-0.5">{station.note}</p>
          )}
        </div>

        {isTimed ? (
          <button
            onClick={toggleTimer}
            className="flex-none flex flex-col items-center justify-center rounded-lg px-4 transition-all active:scale-95"
            style={{
              minHeight: 56,
              minWidth: 96,
              backgroundColor: running ? color : "#0F1420",
              border: `1px solid ${running ? color : "#2A3550"}`,
              boxShadow: running ? `0 0 14px ${color}AA` : "none",
            }}
          >
            <span
              className="font-cond font-black tnum text-2xl leading-none"
              style={{ color: running ? "#080C14" : color }}
            >
              {clock(seconds)}
            </span>
            <span
              className="font-cond font-bold uppercase tracking-widest text-[10px] mt-0.5"
              style={{ color: running ? "#080C14" : "#7A8BA8" }}
            >
              {running ? "Stop" : "Start"}
            </span>
          </button>
        ) : (
          <button
            onClick={() => setDone((d) => !d)}
            className="flex-none flex items-center justify-center rounded-lg px-4 font-cond font-bold uppercase tracking-wider text-sm transition-all active:scale-95"
            style={{
              minHeight: 56,
              minWidth: 96,
              backgroundColor: done ? color : "#0F1420",
              border: `1px solid ${done ? color : "#2A3550"}`,
              color: done ? "#080C14" : "#7A8BA8",
              boxShadow: done ? `0 0 14px ${color}AA` : "none",
            }}
          >
            {done ? "Done ✓" : "Done"}
          </button>
        )}
      </div>
    </div>
  );
}
