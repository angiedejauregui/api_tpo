import React from "react";
import "./TrainerClassCard.css";

export default function TrainerClassCard({ data }) {
  const classImage = data.images?.[0] || null;
  const category = data.category || "";
  const schedule = data.disponibilidadHoraria?.[0] || data.schedule?.[0];
  const driveLink = data.archivosAdjuntos || "";

  const handleOptions = (e) => {
    e.stopPropagation();
    alert("Editar / Eliminar clase");
  };

  const handleViewParticipants = (e) => {
    e.stopPropagation();
    alert("Mostrar participantes");
  };

  const handleOpenDrive = (e) => {
    e.stopPropagation();
    if (driveLink) window.open(driveLink, "_blank");
  };

  return (
    <article className="trainer-class-card">
      <div className="trainer-class-card__images">
        <button className="dots-button" onClick={handleOptions}>
          <span className="material-symbols-outlined">more_vert</span>
        </button>

        
        <img
          className="class-card__image"
          src={classImage?`http://localhost:5000${classImage}`: "/imageNotFound.jpg"}
          alt={`Clase de ${category}`}
        />
        
      </div>

      <div className="trainer-class-card__info">
        {category && (
          <span className="trainer-class-card__category">{category}</span>
        )}

        {schedule?.day && (
          <span className="trainer-class-card__day">- {schedule.day}</span>
        )}

        {schedule && (
          <div className="trainer-class-card__time">
            <span className="material-symbols-outlined">schedule</span>
            <span>
              {schedule.from} - {schedule.to || ""}
            </span>
          </div>
        )}

        <div className="trainer-class-card__actions">
          <button onClick={handleOpenDrive}>
            <span className="material-symbols-outlined">folder</span> Ver archivos
          </button>
          <button onClick={handleViewParticipants}>
            <span className="material-symbols-outlined">group</span> Participantes
          </button>
        </div>
      </div>
    </article>
  );
}