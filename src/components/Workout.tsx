import { useEffect, useRef, useState } from "react";
import type { Day } from "../types";
import { MUSCLE_COLOR } from "../data/program";
import RoadmapHeader, { type RoadmapItem } from "./RoadmapHeader";
import ExerciseCard from "./ExerciseCard";
import FinisherCard from "./FinisherCard";

const PEEK = 64;

export default function Workout({ day, onBack }: { day: Day; onBack: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const ratios = useRef<Map<number, number>>(new Map());
  const [current, setCurrent] = useState(0);

  const total = day.exercises.length + 1; // + finisher

  const roadmapItems: RoadmapItem[] = [
    ...day.exercises.map((e) => ({ color: MUSCLE_COLOR[e.muscle] })),
    { color: day.accent, isFinisher: true },
  ];

  // Track which card is currently snapped to the top.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    ratios.current.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          ratios.current.set(idx, entry.intersectionRatio);
        }
        let best = 0;
        let bestRatio = -1;
        ratios.current.forEach((ratio, idx) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = idx;
          }
        });
        setCurrent(best);
      },
      { root, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [day]);

  function jumpTo(index: number) {
    cardRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function setCardRef(i: number) {
    return (el: HTMLElement | null) => {
      cardRefs.current[i] = el;
      if (el) el.dataset.idx = String(i);
    };
  }

  return (
    <div className="flex h-full flex-col">
      {/* Top bar */}
      <div className="flex-none safe-top">
        <div className="flex items-center gap-3 px-4 h-14">
          <button
            onClick={onBack}
            aria-label="Back"
            className="flex-none flex items-center justify-center rounded-lg w-11 h-11 -ml-1 text-text active:scale-95 transition-transform"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="font-cond font-bold uppercase tracking-[0.15em] text-[11px] px-2 py-0.5 rounded"
                style={{ color: day.accent, backgroundColor: day.accent + "1F" }}
              >
                {day.tag}
              </span>
              <span className="font-cond font-bold uppercase tracking-wide text-[11px] text-text-dim">
                {day.schedule}
              </span>
            </div>
            <h1
              className="font-cond font-black uppercase tracking-wide text-xl leading-none mt-0.5 truncate"
              style={{ color: day.accent }}
            >
              {day.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Roadmap header */}
      <div className="flex-none">
        <RoadmapHeader items={roadmapItems} current={current} onJump={jumpTo} />
      </div>

      {/* Scroll-snap card list */}
      <div ref={scrollRef} className="snap-y no-scrollbar flex-1 min-h-0 overflow-y-auto safe-bottom">
        {day.exercises.map((ex, i) => (
          <div key={ex.id} ref={setCardRef(i)}>
            <ExerciseCard
              exercise={ex}
              index={i}
              total={day.exercises.length}
              nextLabel={
                i < day.exercises.length - 1 ? day.exercises[i + 1].name : "Finisher"
              }
              accent={day.accent}
              peek={PEEK}
            />
          </div>
        ))}

        <div ref={setCardRef(total - 1)}>
          <FinisherCard finisher={day.finisher} accent={day.accent} peek={PEEK} />
        </div>

        {/* trailing spacer so the last card can snap to the top */}
        <div style={{ height: PEEK }} aria-hidden />
      </div>
    </div>
  );
}
