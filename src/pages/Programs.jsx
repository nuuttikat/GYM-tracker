import { useState } from "react";
import { useWorkout } from "../context/WorkoutContext";
import ProgramDetail from "../components/ProgramDetail";

export default function Programs() {
  const { programs, addProgram } = useWorkout();
  const [programName, setProgramName] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleAddProgram = () => {
    if (!programName.trim()) return;

    const newProgram = {
      id: crypto.randomUUID(),
      name: programName,
      exercises: [],
    };

    addProgram(newProgram);
    setProgramName("");
  };

  if (selectedProgram)
    return (
      <ProgramDetail
        program={selectedProgram}
        close={() => setSelectedProgram(null)}
      />
    );

  return (
    <div className="programs-page">
      <h1 className="page-title">Treeniohjelmat</h1>

      <div className="add-program">
        <input
          type="text"
          placeholder="Ohjelman nimi"
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
        />
        <button className="button button-primary" onClick={handleAddProgram}>
          ➕ Lisää ohjelma
        </button>
      </div>

      <div className="program-list">
        {programs.length === 0 && <p>Ei ohjelmia vielä.</p>}
        {programs.map((prog) => (
          <div
            key={prog.id}
            className="card program-card"
            onClick={() => setSelectedProgram(prog)}
            style={{ cursor: "pointer" }}
          >
            <h3>{prog.name}</h3>
            <p>Liikkeitä: {prog.exercises.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
