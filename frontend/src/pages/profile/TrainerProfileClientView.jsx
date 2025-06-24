import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileCard from "../../components/profile/ProfileCard";
import "./TrainerProfileClientView.css";

const TrainerProfileClientView = () => {
  const location = useLocation();
  const { trainer } = location.state || {};
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (!trainer?._id) return;

    fetch(`http://localhost:5000/api/v1/services?instructor=${trainer._id}`)
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.error("Error al obtener clases", err));
  }, [trainer]);

  if (!trainer) return <p>Cargando perfil del entrenador...</p>;

  return (
    <div className="trainer-profile-client-view">
      <div className="trainer-profile-client-view-top-section">
        <div className="trainer-profile-client-view-profile-card">
          <ProfileCard user={trainer} hideActions />
        </div>
        <div className="trainer-profile-client-view-profile-actions">
          <button className="trainer-profile-client-view-stats-btn">
          <h3>📊 Estadísticas del Perfil</h3>
          </button>
         {/* <button className="trainer-profile-client-view-message-btn">
            ✉️ Enviar un mensaje
          </button>*/}
        </div>
      </div>

      <div className="trainer-profile-client-view-classes-grid">
        {classes.length === 0 ? (
          <p>Este entrenador aún no publicó clases.</p>
        ) : (
          classes.map((cls) => {
            const dias = cls.schedule.map(s => s.day).join(", ");
            const horarios = cls.schedule.map(s => s.from).join(" / ");
            const imagen = cls.images?.[0]
              ? `http://localhost:5000${cls.images[0]}`
              : "/imageNotFound.jpg";

            return (
              <div className="trainer-profile-client-view-class-card" key={cls._id}>
                <img src={imagen} alt={cls.category} />
                <h3>{cls.category} – {dias}</h3>
                <p>
                  <span className="material-symbols-outlined" style={{ verticalAlign: "middle", marginRight: "0.25rem" }}>
                    schedule
                  </span>
                  {horarios}
                </p>
                <p>{cls.location} ({cls.modality})</p>
                <p>{cls.description}</p>
                <strong>${cls.price.toLocaleString()}/clase</strong>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TrainerProfileClientView;