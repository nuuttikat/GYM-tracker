import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [programs, setPrograms] = useLocalStorage("programs", []);
  const [sessions, setSessions] = useLocalStorage("sessions", []);

  // 👤 PROFIILI
  const [profile, setProfile] = useLocalStorage("profile", {
    name: "",
    weight: "",
    height: "",
  });

  // ⚖️ PAINOHISTORIA
  const [weightHistory, setWeightHistory] = useLocalStorage("weightHistory", []);

  // ➕ lisää painomerkintä
  const addWeightEntry = (weight) => {
    setWeightHistory((prev) => [
      ...prev,
      {
        date: new Date().toISOString().split("T")[0],
        weight: Number(weight),
      },
    ]);
  };

  // 📋 Ohjelmat
  const addProgram = (program) => {
    setPrograms([...programs, program]);
  };

  const addExerciseToProgram = (programId, exercise) => {
    setPrograms(
      programs.map((p) =>
        p.id === programId
          ? { ...p, exercises: [...p.exercises, exercise] }
          : p
      )
    );
  };

  // 🏋️‍♂️ Treeni
  const saveSession = (session) => {
    setSessions([...sessions, session]);
  };

  return (
    <WorkoutContext.Provider
      value={{
        programs,
        sessions,

        // profiili
        profile,
        setProfile,

        // paino
        weightHistory,
        addWeightEntry,

        // treenit
        addProgram,
        addExerciseToProgram,
        saveSession,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export const useWorkout = () => useContext(WorkoutContext);
