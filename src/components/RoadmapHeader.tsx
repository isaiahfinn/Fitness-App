import { useEffect, useRef } from "react";

export interface RoadmapItem {
  color: string;
  isFinisher?: boolean;
}

export default function RoadmapHeader({
  items,
  current,
  onJump,
}: {
  items: RoadmapItem[];
  current: number;
  onJump: (index: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keep the current roadmap item visible.
  useEffect(() => {
    const el = itemRefs.current[current];
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [current]);

  return (
    <div
      ref={scrollRef}
      className="no-scrollbar flex items-center gap-2.5 overflow-x-auto px-4 h-16 border-b border-border bg-bg"
    >
      {items.map((item, i) => {
        const done = i < current;
        const active = i === current;
        const color = item.color;

        if (item.isFinisher) {
          return (
            <button
              key="finisher"
              ref={(el) => (itemRefs.current[i] = el)}
              onClick={() => onJump(i)}
              className="flex-none flex items-center justify-center rounded-md font-cond font-bold uppercase tracking-wider text-[11px] px-2.5 transition-all"
              style={{
                height: active ? 30 : 26,
                color: done || active ? "#080C14" : "#7A8BA8",
                backgroundColor: done || active ? color : "#2A3040",
                boxShadow: active ? `0 0 12px ${color}AA` : "none",
                outline: active ? "2px solid #F0F2F8" : "none",
                outlineOffset: 1,
              }}
            >
              FIN
            </button>
          );
        }

        return (
          <button
            key={i}
            ref={(el) => (itemRefs.current[i] = el)}
            onClick={() => onJump(i)}
            aria-label={`Exercise ${i + 1}`}
            className="flex-none rounded-full transition-all"
            style={{
              width: active ? 16 : 11,
              height: active ? 16 : 11,
              backgroundColor: done || active ? color : "#2A3040",
              boxShadow: active ? `0 0 10px ${color}` : "none",
              outline: active ? "2px solid #F0F2F8" : "none",
              outlineOffset: 2,
            }}
          />
        );
      })}
    </div>
  );
}
