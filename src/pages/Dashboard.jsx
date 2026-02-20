import { useWorkout } from "../context/WorkoutContext";
import "../styles/pages/dashboard.css";

export default function Dashboard({ setPage }) {
  const { profile, sessions } = useWorkout();

  // ===== BMI =====
  const weight = Number(profile.weight);
  const heightCm = Number(profile.height);
  const heightM = heightCm / 100;

  const bmi =
    weight > 0 && heightM > 0
      ? (weight / (heightM * heightM)).toFixed(1)
      : null;

  const bmiLabel = bmi
    ? bmi < 18.5
      ? "Alipaino"
      : bmi < 25
      ? "Normaali"
      : bmi < 30
      ? "Ylipaino"
      : "Merkittävä ylipaino"
    : null;

  const lastSession =
    sessions.length > 0
      ? sessions[sessions.length - 1]
      : null;

  // ===== ENNÄTYSPAINOT (UUSI RAKENNE) =====
  const prMap = {};

  sessions.forEach((session) => {
    session.exercises.forEach((ex) => {
      if (!Array.isArray(ex.sets)) return;

      ex.sets.forEach((set) => {
        const w = Number(set.weight) || 0;

        if (!prMap[ex.name] || w > prMap[ex.name]) {
          prMap[ex.name] = w;
        }
      });
    });
  });

  const topPRs = Object.entries(prMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // ===== PAINON KEHITYS (UUSI RAKENNE) =====
  const weightData = sessions
    .map((session) => {
      let totalWeight = 0;

      session.exercises.forEach((ex) => {
        if (!Array.isArray(ex.sets)) return;

        ex.sets.forEach((set) => {
          totalWeight += Number(set.weight) || 0;
        });
      });

      return {
        date: session.date,
        totalWeight,
      };
    })
    .filter((s) => s.totalWeight > 0);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">
        {profile.name
          ? `Tervetuloa takaisin, ${profile.name} 💪`
          : "Tervetuloa Gym Trackeriin"}
      </h1>

      {/* Profiili */}
      <div className="dashboard-card">
        <h2>Profiili</h2>
        <p>Nimi: {profile.name || "—"}</p>
        <p>Paino: {profile.weight ? `${profile.weight} kg` : "—"}</p>
        <p>Pituus: {profile.height ? `${profile.height} cm` : "—"}</p>
        {bmi && (
          <p>
            BMI: {bmi} ({bmiLabel})
          </p>
        )}
      </div>

      {/* Treenit */}
      <div className="dashboard-card">
        <h2>Treenit</h2>
        <p>Treenejä yhteensä: {sessions.length}</p>
        <p>
          Viimeisin treeni:{" "}
          {lastSession
            ? new Date(lastSession.date).toLocaleDateString()
            : "—"}
        </p>
      </div>

      {/* Ennätyst */}
      <div className="dashboard-card">
        <h2>Ennätyspainot</h2>

        {topPRs.length === 0 && <p>Ei vielä ennätyksiä</p>}

        {topPRs.map(([name, weight]) => (
          <p key={name}>
            {name}: {weight} kg
          </p>
        ))}
      </div>

      {/* Painon kehitys */}
      <div className="dashboard-card">
        <h2>Painon kehitys</h2>

        <div className="chart">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="chart-grid-line"
              style={{ bottom: `${i * 20}%` }}
            />
          ))}

          {weightData.map((session, index) => (
            <div key={index} className="chart-column">
              <div
                className="chart-bar"
                style={{ height: `${session.totalWeight * 0.2}px` }}
              >
                <span className="chart-bar-value">
                  {session.totalWeight} kg
                </span>
              </div>
              <span className="chart-label">
                {new Date(session.date).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Toiminnot */}
      <div className="dashboard-actions">
        <button
          className="button button-primary"
          onClick={() => setPage("workout")}
        >
          ▶️ Aloita treeni
        </button>

        <button
          className="button"
          onClick={() => setPage("programs")}
        >
          🏋️ Treeniohjelmat
        </button>

        <button
          className="button"
          onClick={() => setPage("profile")}
        >
          👤 Muokkaa profiilia
        </button>
      </div>
    </div>
  );
}
