import { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../../components/profile/ProfileCard";
import "./ProfileTrainerView.css";
import MyClasses from "../../components/profile/trainerView/MyClasses";
import NewClass from "../classActions/NewClass";
import { useNavigate } from "react-router-dom";


const ProfileTrainerView = () => {
  const [user, setUser] = useState(null);
  const [showNewClass, setShowNewClass] = useState(false);
  const navigate = useNavigate();

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
              <span className="material-symbols-outlined" >analytics</span>
              Estadísticas Del Perfil
            </button>
            <button className="action-btn " onClick={() => navigate("/profile/trainer/archive")}>
              <span className="material-symbols-outlined">schedule</span>
              Archivo
            </button>
          </div>
          
          <div className="half-width-buttons">
            <button className="action-btn new-post" onClick={() =>setShowNewClass(true)}>
              <span className="material-symbols-outlined new-post-icon">publish</span>
              Nueva <br></br> Publicación
            </button>
            <button className="action-btn" style={{backgroundColor:"#151515da"}} onClick={() => navigate("")}>
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
