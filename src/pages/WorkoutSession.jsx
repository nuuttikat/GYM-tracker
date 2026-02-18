import { useState, useEffect } from "react";
import { useWorkout } from "../context/WorkoutContext";
import "../styles/pages/workoutSession.css";
import WorkoutTimer from "../components/WorkoutTimer";

export default function WorkoutSession({ goBack }) {
  const { programs, saveSession } = useWorkout();

  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [exerciseLogs, setExerciseLogs] = useState({});
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [isSessionRunning, setIsSessionRunning] = useState(true);

  // Ajastin
  useEffect(() => {
    if (!isSessionRunning) return;

    const interval = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isSessionRunning]);

  // Kun ohjelma valitaan, alustetaan sarjat
  useEffect(() => {
    if (!selectedProgram) return;

    const logs = {};
    selectedProgram.exercises.forEach((ex) => {
      logs[ex.id] = Array(ex.sets).fill({ reps: ex.reps, weight: 0 });
    });
    setExerciseLogs(logs);
  }, [selectedProgram]);

  const handleInputChange = (exerciseId, setIndex, field, value) => {
    setExerciseLogs((prev) => {
      const newSets = [...prev[exerciseId]];
      newSets[setIndex] = { ...newSets[setIndex], [field]: value };
      return { ...prev, [exerciseId]: newSets };
    });
  };

  const handleSaveSession = () => {
    if (!selectedProgram) return;

    const session = {
      id: crypto.randomUUID(),
      programId: selectedProgram.id,
      date: new Date().toISOString(),
      duration: sessionSeconds,
      exercises: selectedProgram.exercises.map((ex) => ({
        ...ex,
        sets: exerciseLogs[ex.id],
      })),
    };

    saveSession(session);
    alert("Treenisessio tallennettu!");
    goBack();
  };

  return (
    <div className="workout-session">
      <button className="button button-danger" onClick={goBack}>
        ← Takaisin
      </button>

      <h1>Aloita treeni</h1>

      <WorkoutTimer
        workSeconds={sessionSeconds}
        setWorkSeconds={setSessionSeconds}
        isSessionRunning={isSessionRunning}
      />

      {!selectedProgram && (
        <select
          value={selectedProgramId}
          onChange={(e) => {
            const program = programs.find((p) => p.id === e.target.value);
            setSelectedProgramId(e.target.value);
            setSelectedProgram(program);
          }}
        >
          <option value="">Valitse ohjelma</option>
          {programs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      )}

      {selectedProgram && (
        <div className="selected-program-banner">🏋️ {selectedProgram.name}</div>
      )}

      {selectedProgram &&
        selectedProgram.exercises.map((ex) => (
          <div key={ex.id} className="exercise-card">
            <h3>{ex.name}</h3>
            {exerciseLogs[ex.id]?.map((set, index) => (
              <div key={index} className="set-row">
                <span>Sarja {index + 1}</span>

                <label>
                  Toistot
                  <input
                    type="number"
                    value={set.reps}
                    min={1}
                    onChange={(e) =>
                      handleInputChange(ex.id, index, "reps", Number(e.target.value))
                    }
                  />
                </label>

                <label>
                  Paino (kg)
                  <input
                    type="number"
                    value={set.weight}
                    min={0}
                    onChange={(e) =>
                      handleInputChange(ex.id, index, "weight", Number(e.target.value))
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        ))}

      {selectedProgram && (
        <button className="button button-primary" onClick={handleSaveSession}>
          💾 Tallenna sessio
        </button>
      )}
    </div>
  );
}
