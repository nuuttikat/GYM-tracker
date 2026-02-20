import { useMemo } from "react";
import { useWorkout } from "../context/WorkoutContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "../styles/pages/workoutSession.css";
import WorkoutTimer from "../components/WorkoutTimer";

const INITIAL_DRAFT = {
  selectedProgramId: "",
  exerciseLogs: {},
  sessionSeconds: 0,
  isSessionRunning: true,
};

export default function WorkoutSession({ goBack }) {
  const { programs, saveSession } = useWorkout();

  const [activeWorkoutDraft, setActiveWorkoutDraft] = useLocalStorage(
    "activeWorkoutDraft",
    INITIAL_DRAFT
  );

  const { selectedProgramId, exerciseLogs, sessionSeconds, isSessionRunning } =
    activeWorkoutDraft;

  const selectedProgram = useMemo(
    () => programs.find((p) => p.id === selectedProgramId) ?? null,
    [programs, selectedProgramId]
  );

  const updateDraft = (changes) => {
    setActiveWorkoutDraft((prev) => ({ ...prev, ...changes }));
  };

  const buildInitialExerciseLogs = (program) => {
    const logs = {};
    program.exercises.forEach((ex) => {
      logs[ex.id] = Array.from({ length: ex.sets }, () => ({
        reps: ex.reps,
        weight: 0,
      }));
    });
    return logs;
  };

  const handleProgramChange = (programId) => {
    const program = programs.find((p) => p.id === programId);

    if (!program) {
      setActiveWorkoutDraft(INITIAL_DRAFT);
      return;
    }

    updateDraft({
      selectedProgramId: programId,
      exerciseLogs: buildInitialExerciseLogs(program),
    });
  };

  const handleInputChange = (exerciseId, setIndex, field, value) => {
    const newSets = [...(exerciseLogs[exerciseId] ?? [])];
    newSets[setIndex] = { ...newSets[setIndex], [field]: value };

    updateDraft({
      exerciseLogs: {
        ...exerciseLogs,
        [exerciseId]: newSets,
      },
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
    setActiveWorkoutDraft(INITIAL_DRAFT);
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
        setWorkSeconds={(nextSeconds) => {
          setActiveWorkoutDraft((prev) => ({
            ...prev,
            sessionSeconds:
              typeof nextSeconds === "function"
                ? nextSeconds(prev.sessionSeconds)
                : nextSeconds,
          }));
        }}
        isSessionRunning={isSessionRunning}
      />

      {!selectedProgram && (
        <select
          value={selectedProgramId}
          onChange={(e) => handleProgramChange(e.target.value)}
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
        <div className="selected-program-banner">
          🏋️ {selectedProgram.name}
        </div>
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
                    onChange={(e) =>
                      handleInputChange(
                        ex.id,
                        index,
                        "reps",
                        Number(e.target.value)
                      )
                    }
                  />
                </label>

                <label>
                  Paino (kg)
                  <input
                    type="number"
                    value={set.weight}
                    onChange={(e) =>
                      handleInputChange(
                        ex.id,
                        index,
                        "weight",
                        Number(e.target.value)
                      )
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        ))}

      {selectedProgram && (
        <button className="button button-primary" onClick={handleSaveSession}>
          💾 Tallenna treeni
        </button>
      )}
    </div>
  );
}