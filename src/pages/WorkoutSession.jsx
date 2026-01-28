import { useState } from "react";
import { useWorkout } from "../context/WorkoutContext";
import "../styles/pages/workoutSession.css";

export default function WorkoutSession({ goBack }) {
  const { programs, saveSession } = useWorkout();
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [exerciseLogs, setExerciseLogs] = useState({});

  const selectedProgram = programs.find((p) => p.id === selectedProgramId);

  const handleInputChange = (exerciseId, field, value) => {
    setExerciseLogs({
      ...exerciseLogs,
      [exerciseId]: { ...exerciseLogs[exerciseId], [field]: Number(value) },
    });
  };

  const handleSaveSession = () => {
    if (!selectedProgram) return;

    const session = {
      id: crypto.randomUUID(),
      programId: selectedProgram.id,
      date: new Date().toISOString(),
      exercises: selectedProgram.exercises.map((ex) => ({
        ...ex,
        ...exerciseLogs[ex.id],
      })),
    };

    saveSession(session);
    alert("Treenisessio tallennettu!");
    goBack(); // palaa edelliselle sivulle
  };

  return (
    <div className="workout-session">
      <button className="button button-danger" onClick={goBack}>
        ← Takaisin
      </button>

      <h1>Aloita treeni</h1>

      {/* Valitse ohjelma */}
      <select
        value={selectedProgramId}
        onChange={(e) => setSelectedProgramId(e.target.value)}
      >
        <option value="">Valitse ohjelma</option>
        {programs.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      {selectedProgram && (
        <div className="exercise-list">
          {selectedProgram.exercises.map((ex) => (
            <div key={ex.id} className="exercise-card">
              <h3>{ex.name}</h3>
              <div className="inputs">
                <input
                  type="number"
                  placeholder="Sarjat"
                  value={exerciseLogs[ex.id]?.sets || ex.sets}
                  onChange={(e) =>
                    handleInputChange(ex.id, "sets", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Toistot"
                  value={exerciseLogs[ex.id]?.reps || ex.reps}
                  onChange={(e) =>
                    handleInputChange(ex.id, "reps", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Paino"
                  value={exerciseLogs[ex.id]?.weight || ex.weight}
                  onChange={(e) =>
                    handleInputChange(ex.id, "weight", e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          <button className="button button-primary" onClick={handleSaveSession}>
            💾 Tallenna sessio
          </button>
        </div>
      )}
    </div>
  );
}
