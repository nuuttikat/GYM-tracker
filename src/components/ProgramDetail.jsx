import { useState } from "react";
import { useWorkout } from "../context/WorkoutContext";
import "../styles/components/programDetail.css";

export default function ProgramDetail({ program, close }) {
  const { addExerciseToProgram } = useWorkout();
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(8);

  const handleAddExercise = () => {
    if (!exerciseName.trim()) return;

    const newExercise = {
      id: crypto.randomUUID(),
      name: exerciseName,
      sets, 
      reps,
    };

    addExerciseToProgram(program.id, newExercise);

    // Reset input fields
    setExerciseName("");
    setSets(3);
    setReps(8);
  };

  return (
    <div className="program-detail">
      <h2>{program.name}</h2>
      <button className="button button-danger" onClick={close}>
        ✖ Sulje
      </button>

      {/* Lomake uuden liikkeen lisäämiseen */}
      <div className="exercise-form">
        <input
          type="text"
          placeholder="Liikkeen nimi"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
        <div className="form-group">
         <label>Sarjat</label>
         <input
            type="number"
           value={sets}
           min={1}
           onChange={(e) => setSets(Number(e.target.value))}
         />
        </div>

        <div className="form-group">
          <label>Toistot</label>
          <input
            type="number"
            value={reps}
            min={1}
            onChange={(e) => setReps(Number(e.target.value))}
          />
        </div>

        <button className="button button-primary" onClick={handleAddExercise}>
          ➕ Lisää liike
        </button>
      </div>

      {/* Lista ohjelman liikkeistä */}
      <div className="exercise-list">
        {program.exercises.length === 0 && <p>Ei vielä liikkeitä.</p>}
        {program.exercises.map((ex) => (
          <div key={ex.id} className="card exercise-card">
            <strong>{ex.name}</strong> – {ex.sets}x{ex.reps}
          </div>
        ))}
      </div>
    </div>
  );
}
