import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [programs, setPrograms] = useLocalStorage("programs", []);
  const [sessions, setSessions] = useLocalStorage("sessions", []);

  // Lisää ohjelma
  const addProgram = (program) => {
    setPrograms([...programs, program]);
  };

  // Lisää liike ohjelmaan
  const addExerciseToProgram = (programId, exercise) => {
    setPrograms(
      programs.map((p) =>
        p.id === programId
          ? { ...p, exercises: [...p.exercises, exercise] }
          : p
      )
    );
  };

  // Tallentaa treenikerran
  const saveSession = (session) => {
    setSessions([...sessions, session]);
  };

  return (
    <WorkoutContext.Provider
      value={{ programs, sessions, addProgram, addExerciseToProgram, saveSession }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export const useWorkout = () => useContext(WorkoutContext);
