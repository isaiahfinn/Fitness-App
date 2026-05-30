import { PROGRAM } from "../data/program";

export default function Home({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <div className="h-full overflow-y-auto no-scrollbar safe-top safe-bottom">
      <div className="mx-auto max-w-md px-5 pb-10">
        <header className="pt-8 pb-6">
          <p className="font-cond font-bold uppercase tracking-[0.2em] text-sm text-text-dim">
            Personal Program
          </p>
          <h1 className="font-cond font-black uppercase tracking-wide text-5xl leading-none mt-1">
            Train
          </h1>
        </header>

        <div className="flex flex-col gap-4">
          {PROGRAM.map((day) => {
            const num = String(day.id).padStart(2, "0");
            return (
              <button
                key={day.id}
                onClick={() => onSelect(day.id)}
                className="group relative w-full text-left rounded-2xl bg-card border border-border overflow-hidden transition-transform active:scale-[0.985]"
                style={{ minHeight: 132 }}
              >
                {/* Accent stripe */}
                <span
                  className="absolute left-0 top-0 bottom-0 w-1.5"
                  style={{ backgroundColor: day.accent }}
                />

                <div className="flex items-stretch pl-5 pr-4 py-4">
                  {/* Big number */}
                  <div className="flex items-center">
                    <span
                      className="font-cond font-black tnum leading-none text-[76px]"
                      style={{ color: day.accent }}
                    >
                      {num}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-center pl-4 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-cond font-bold uppercase tracking-[0.15em] text-xs px-2 py-0.5 rounded"
                        style={{
                          color: day.accent,
                          backgroundColor: day.accent + "1F",
                        }}
                      >
                        {day.tag}
                      </span>
                      <span className="font-cond font-bold uppercase tracking-wide text-xs text-text-dim">
                        {day.schedule}
                      </span>
                    </div>
                    <h2 className="font-cond font-black uppercase tracking-wide text-2xl leading-tight mt-1 text-text truncate">
                      {day.name}
                    </h2>
                    <p className="font-body text-sm text-text-dim mt-1">
                      {day.exercises.length} exercises · finisher
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
