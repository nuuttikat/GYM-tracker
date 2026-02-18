Simppeli salilla käymisen seurramis ohjelma.
	Localstorage
	perus salitreenit
		mahdollisuus merkata liikkeet
			sarjat+painot+toistot
	todella simppeli rakenne 
		kortit


Rakenne
src/
├─ components/
│   ├─ Sidebar.jsx
│   ├─ WorkoutCard.jsx
│   ├─ ExerciseRow.jsxs
│   ├─ SetInput.jsx
│   ├─ Modal.jsx
│   ├─ ProgressBar.jsx
│   ├─ Nav.jsx
│   └─ WorkoutContext.jsx
│
├─ pages/
│   ├─ Dashboard.jsx
│   ├─ Programs.jsx
│   ├─ WorkoutSession.jsx
│   └─ History.jsx
│
├─ context/
│   └─ WorkoutContext.jsx
│
├─ hooks/
│   └─ useLocalStorage.js
│
├─ data/
│   └─ seedPrograms.js
│
├─ Styles/
│   ├─ Sidebar.jsx
│   ├─ WorkoutCard.jsx
│   ├─ ExerciseRow.jsxs
│   ├─ SetInput.jsx
│   ├─ Modal.jsx
│   ├─ ProgressBar.jsx
│   ├─ Nav.jsx
│   ├─ WorkoutContext.jsx
│   ├─ components/
│   │           ├─ Nav.jsx
│   │           └─ WorkoutContext.jsx
│   ├─ components/
│               ├─ ProgressBar.jsx
│               ├─ Nav.jsx
│               └─ WorkoutContext.jsx
│
│
│
├─ App.jsx
└─ main.jsx

tulevat päivitykset 
	Database firebase


    {
  id: crypto.randomUUID(),
  name: "Push Day",
  exercises: []
}

{
  id: crypto.randomUUID(),
  name: "Bench Press",
  sets: 3,
  reps: 8,
  weight: 80
}


{
  id: crypto.randomUUID(),
  programId,
  date: new Date().toISOString(),
  exercises: []
}
