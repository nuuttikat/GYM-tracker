import { useState, useEffect } from "react";

export default function WorkoutTimer({
  workSeconds,
  setWorkSeconds,
  isSessionRunning
}) {
  const [restSeconds, setRestSeconds] = useState(60);
  const [restRemaining, setRestRemaining] = useState(0);
  const [isRestRunning, setIsRestRunning] = useState(false);

  // 🏋️ treeniaika (auto)
  useEffect(() => {
    if (!isSessionRunning) return;

    const interval = setInterval(() => {
      setWorkSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isSessionRunning]);

  // 😴 lepo countdown
  useEffect(() => {
    if (!isRestRunning) return;

    const interval = setInterval(() => {
      setRestRemaining((prev) => {
        if (prev <= 1) {
          setIsRestRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRestRunning]);

  const format = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
  };

  const startRest = () => {
    setRestRemaining(restSeconds);
    setIsRestRunning(true);
  };

  return (
    <div className="timer-wrapper">
      <div className="timer-box">
        <h3>🏋️ Treeniaika</h3>
        <div className="time">{format(workSeconds)}</div>
      </div>

      <div className="timer-box rest">
        <h3>😴 Lepo</h3>

        <input
          type="number"
          value={restSeconds}
          onChange={(e)=>setRestSeconds(Number(e.target.value))}
        />

        <div className="time">
          {format(restRemaining)}
        </div>

        <button onClick={startRest}>
          ▶ Start Rest
        </button>
      </div>
    </div>
  );
}
