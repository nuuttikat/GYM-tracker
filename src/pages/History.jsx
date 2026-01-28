import { useWorkout } from "../context/WorkoutContext";
import "../styles/pages/history.css";

export default function History() {
  const { sessions, programs } = useWorkout();

  // Helper: hae ohjelman nimi sessionin ohjelmaId:n perusteella
  const getProgramName = (programId) => {
    const prog = programs.find((p) => p.id === programId);
    return prog ? prog.name : "Tuntematon ohjelma";
  };

  if (sessions.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Ei treenihistoriaa vielä.</p>;
  }

  return (
    <div className="history-page">
      <h1>Treeni History</h1>
      {sessions
        .slice()
        .reverse()
        .map((sess) => (
          <div key={sess.id} className="session-card">
            <h3>
              {getProgramName(sess.programId)} –{" "}
              {new Date(sess.date).toLocaleDateString()}
            </h3>
            <div className="exercise-list">
              {sess.exercises.map((ex) => (
                <div key={ex.id} className="exercise-card">
                  {ex.name}: {ex.sets}x{ex.reps} @ {ex.weight}kg
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
