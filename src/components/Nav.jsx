import "../styles/components/nav.css";

export default function Nav({ currentPage, setPage }) {
  return (
    <nav className="nav-bar">
      <h2 className="nav-logo">Gym Tracker</h2>
      <div className="nav-buttons">
        <button
          className={`nav-button ${currentPage === "dashboard" ? "active" : ""}`}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`nav-button ${currentPage === "programs" ? "active" : ""}`}
          onClick={() => setPage("programs")}
        >
          Programs
        </button>
        <button
          className={`nav-button ${currentPage === "history" ? "active" : ""}`}
          onClick={() => setPage("history")}
        >
          History
        </button>
      </div>
    </nav>
  );
}
