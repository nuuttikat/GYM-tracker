import { useWorkout } from "../context/WorkoutContext";
import "../styles/pages/profile.css";

export default function Profile() {
  const { profile, setProfile } = useWorkout();

  // Lasketaan BMI
  const weight = Number(profile.weight);
  const heightM = Number(profile.height) / 100;

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

  const protein = Math.round(weight * 2.2).toFixed(1);



  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <div className="profile-page">
      <h1>Profiili</h1>
      <div className="profile-card">
        <label>
          Nimi
          <input
            type="text"
            value={profile.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Etunimi"
          />
        </label>

        <label>
          Paino (kg)
          <input
            type="number"
            value={profile.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
          />
        </label>

        <label>
          Pituus (cm)
          <input
            type="number"
            value={profile.height}
            onChange={(e) => handleChange("height", e.target.value)}
          />
        </label>

        <p className="profile-note">
          Tiedot tallentuvat automaattisesti
        </p>

        <p>BMI: {bmi ? `${bmi} (${bmiLabel})` : "—"}</p>
        <p>Proteiini tarve: {protein} g</p>
      </div>
    </div>
  );
}
