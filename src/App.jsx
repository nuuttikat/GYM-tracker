import { useState } from "react";
import { WorkoutProvider } from "./context/WorkoutContext";

import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import Programs from "./pages/Programs";
import WorkoutSession from "./pages/WorkoutSession";
import History from "./pages/History";
import Profile from "./pages/Profile";


function App() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "profile":
        return <Profile />;
      case "programs":
        return <Programs />;
      case "workout":
        return <WorkoutSession goBack={() => setPage("dashboard")} />;
      case "history":
        return <History />;
      case "dashboard":
      default:
        return <Dashboard setPage={setPage} />;
    }
  };

  return (
    <WorkoutProvider>
      <Nav currentPage={page} setPage={setPage} />
      <main className="main">
        {renderPage()}
      </main>
    </WorkoutProvider>
  );
}

export default App;
