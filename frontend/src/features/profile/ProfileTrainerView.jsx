import { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../../components/profile/ProfileCard";
import "./ProfileTrainerView.css";
import MyClasses from "../../components/profile/trainerView/MyClasses";
import NewClass from "../../components/profile/trainerView/NewClass";

const ProfileTrainerView = () => {
  const [user, setUser] = useState(null);
  const [showNewClass, setShowNewClass] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error al obtener perfil", err));
  }, []);

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="trainer-view-container">
      <div className="profile-layout">

        <div className="profile-card-section">
          <ProfileCard user={user} />
        </div>

        <div className="profile-actions-section">
          
          <div className="full-width-button">
            <button className="action-btn stats-btn" onClick={() => navigate("/profile/trainer/stats")}>
              <span class="material-symbols-outlined" >analytics</span>
              Estadísticas Del Perfil
            </button>
            <button className="action-btn " onClick={() => navigate("/profile/trainer/history")}>
              <span className="material-symbols-outlined">schedule</span>
              Archivo
            </button>
          </div>
          
          <div className="half-width-buttons">
            <button className="action-btn new-post" onClick={() =>setShowNewClass(true)}>
              <span className="material-symbols-outlined">publish</span>
              Nueva Publicación
            </button>
            <button className="action-btn" onClick={() => navigate("")}>
              Ver mi Semana
            </button>
          </div>
          
        </div>
      </div>
      
      <MyClasses />

      {showNewClass && <NewClass onClose={() => setShowNewClass(false)} />}
    </div>
  );
};

export default ProfileTrainerView;
