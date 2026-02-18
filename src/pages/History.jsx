import { useWorkout } from "../context/WorkoutContext";
import "../styles/pages/history.css";

export default function History() {
  const { sessions, programs, setSessions } = useWorkout();

  const handleDeleteSession = (sessionId) => {
    if (confirm("Haluatko varmasti poistaa tämän treenihistorian?")) {
      const updated = sessions.filter((s) => s.id !== sessionId);
      setSessions(updated);
    }
  };

  const getProgramName = (programId) => {
    const prog = programs.find((p) => p.id === programId);
    return prog ? prog.name : "Tuntematon ohjelma";
  };

  if (sessions.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Ei treenihistoriaa vielä.
      </p>
    );
  }

  // Tilastot
  const totalSessions = sessions.length;
  let totalExercises = 0;
  let totalSets = 0;
  let totalReps = 0;
  let totalWeight = 0;

  sessions.forEach((sess) => {
    sess.exercises.forEach((ex) => {
      totalExercises += 1;

      if (Array.isArray(ex.sets)) {
        totalSets += ex.sets.length;

        ex.sets.forEach((set) => {
          totalReps += Number(set.reps) || 0;
          totalWeight +=
            (Number(set.reps) || 0) * (Number(set.weight) || 0);
        });
      }
    });
  });

  const avgWeightPerRep =
    totalReps > 0 ? (totalWeight / totalReps).toFixed(1) : 0;

  return (
    <div className="history-page">
      <h1>Treeni History</h1>

      {/* Tilastot */}
      <div className="stats-summary">
        <p>Treenejä yhteensä: {totalSessions}</p>
        <p>Liikkeitä yhteensä: {totalExercises}</p>
        <p>Yhteensä sarjoja: {totalSets}</p>
        <p>Yhteensä toistoja: {totalReps}</p>
        <p>Keskimääräinen paino per toisto: {avgWeightPerRep} kg</p>
      </div>

      {/* Sessionit */}
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
                  <strong>{ex.name}</strong>

                  {Array.isArray(ex.sets) &&
                    ex.sets.map((set, index) => (
                      <div key={index} className="set-row">
                        Sarja {index + 1}:{" "}
                        <span className="reps">
                          {set.reps} toistoa
                        </span>{" "}
                        @{" "}
                        <span className="weight">
                          {set.weight} kg
                        </span>
                      </div>
                    ))}
                </div>
              ))}
            </div>

            <button
              className="button button-danger"
              onClick={() => handleDeleteSession(sess.id)}
              style={{ marginTop: "0.5rem" }}
            >
              🗑️ Poista treeni
            </button>
          </div>
        ))}
    </div>
  );
}
