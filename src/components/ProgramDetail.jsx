import { useState } from "react";
import { useWorkout } from "../context/WorkoutContext";
import "../styles/components/programDetail.css";

export default function ProgramDetail({ program, close }) {
  const { addExerciseToProgram } = useWorkout();
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(8);
  const [weight, setWeight] = useState(0);

  const handleAddExercise = () => {
    if (!exerciseName.trim()) return;

    const newExercise = {
      id: crypto.randomUUID(),
      name: exerciseName,
      sets,
      reps,
      weight,
    };

    addExerciseToProgram(program.id, newExercise);
    setExerciseName("");
    setSets(3);
    setReps(8);
    setWeight(0);
  };

  return (
    <div className="program-detail">
      <h2>{program.name}</h2>
      <button className="button button-danger" onClick={close}>
        ✖ Sulje
      </button>

      <div className="exercise-form">
        <input
          type="text"
          placeholder="Liikkeen nimi"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Sarjat"
          value={sets}
          onChange={(e) => setSets(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Toistot"
          value={reps}
          onChange={(e) => setReps(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Paino (kg)"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
        <button className="button button-primary" onClick={handleAddExercise}>
          ➕ Lisää liike
        </button>
      </div>

      <div className="exercise-list">
        {program.exercises.map((ex) => (
          <div key={ex.id} className="card">
            {ex.name} – {ex.sets}x{ex.reps} @ {ex.weight}kg
          </div>
        ))}
      </div>
    </div>
  );
}
