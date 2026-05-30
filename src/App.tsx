import { useState } from "react";
import { PROGRAM } from "./data/program";
import Home from "./components/Home";
import Workout from "./components/Workout";

export default function App() {
  const [dayId, setDayId] = useState<number | null>(null);

  const day = dayId !== null ? PROGRAM.find((d) => d.id === dayId) : null;

  return (
    <div className="h-full bg-bg text-text">
      {day ? (
        <Workout day={day} onBack={() => setDayId(null)} />
      ) : (
        <Home onSelect={setDayId} />
      )}
    </div>
  );
}
