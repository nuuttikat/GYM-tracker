import "../styles/pages/dashboard.css";

export default function Dashboard({ setPage }) {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Gym Tracker</h1>
      <p className="dashboard-subtitle">
        Kirjaa treenisi, seuraa kehitystä ja rakenna ohjelmia.
      </p>

      <div className="dashboard-actions">
        <button
          className="button button-primary"
          onClick={() => setPage("programs")} // Vie Programs-sivulle
        >
          ➕ Luo treeniohjelma
        </button>

        <button
            className="button"
            onClick={() => setPage("workout")}
        >
            ▶️ Aloita treeni
        </button>

      </div>

      {/* Esimerkki tilastoista */}
      <div className="dashboard-stats">
        <div className="card">
          <h3>Ohjelmia</h3>
          <p>Katso Programs-sivulta</p>
        </div>

        <div className="card">
          <h3>Treenikertoja</h3>
          <p>Katso History myöhemmin</p>
        </div>
      </div>
    </div>
  );
}
