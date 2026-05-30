import { useEffect, useRef, useState } from "react";
import { getWeight, saveWeight } from "../lib/storage";

const STEP = 2.5;

function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export default function WeightLogger({
  exerciseId,
  accent,
}: {
  exerciseId: string;
  accent: string;
}) {
  const [last, setLast] = useState<number | null>(null);
  const [val, setVal] = useState<string>("");
  const [saved, setSaved] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const w = getWeight(exerciseId);
    setLast(w);
    setVal(w !== null ? fmt(w) : "20");
  }, [exerciseId]);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function step(delta: number) {
    const cur = parseFloat(val);
    const base = Number.isNaN(cur) ? 0 : cur;
    const next = Math.max(0, Math.round((base + delta) * 2) / 2);
    setVal(fmt(next));
  }

  function onSave() {
    const cur = parseFloat(val);
    if (Number.isNaN(cur)) return;
    const clean = Math.max(0, cur);
    saveWeight(exerciseId, clean);
    setLast(clean);
    setVal(fmt(clean));
    setSaved(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="rounded-xl bg-card-raised border border-border p-4">
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-cond font-bold uppercase tracking-[0.15em] text-xs text-text-dim">
          Last weight
        </span>
        <span className="font-cond font-black text-text-dim text-lg tnum">
          {last !== null ? `${fmt(last)} kg` : "--"}
        </span>
      </div>

      <div className="flex items-stretch gap-3">
        <button
          onClick={() => step(-STEP)}
          aria-label="Decrease 2.5kg"
          className="flex-none w-[60px] rounded-lg bg-card border border-border-lit font-cond font-black text-2xl text-text active:scale-95 transition-transform"
          style={{ minHeight: 64 }}
        >
          −
        </button>

        <div className="flex-1 flex items-center justify-center rounded-lg bg-card border border-border px-2">
          <input
            type="text"
            inputMode="decimal"
            value={val}
            onChange={(e) => setVal(e.target.value.replace(/[^0-9.]/g, ""))}
            className="w-full bg-transparent text-center font-cond font-black tnum text-[52px] leading-none text-text outline-none"
            aria-label="Weight in kg"
          />
          <span className="font-cond font-bold text-text-dim text-lg pr-1">kg</span>
        </div>

        <button
          onClick={() => step(STEP)}
          aria-label="Increase 2.5kg"
          className="flex-none w-[60px] rounded-lg bg-card border border-border-lit font-cond font-black text-2xl text-text active:scale-95 transition-transform"
          style={{ minHeight: 64 }}
        >
          +
        </button>
      </div>

      <button
        onClick={onSave}
        className="mt-3 w-full rounded-lg font-cond font-bold uppercase tracking-[0.15em] text-base text-bg transition-all active:scale-[0.98]"
        style={{
          minHeight: 56,
          backgroundColor: accent,
          boxShadow: saved ? `0 0 16px ${accent}AA` : "none",
        }}
      >
        {saved ? "Saved ✓" : "Save"}
      </button>
    </div>
  );
}
