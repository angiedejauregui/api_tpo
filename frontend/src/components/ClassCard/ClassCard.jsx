import React from "react";
import './ClassCard.css';
import { useNavigate } from "react-router-dom";

export default function ClassCard({ data }) {
  const instructor = data.instructor;
  const instructorName = instructor
    ? `${instructor.name || ""} ${instructor.lastName || ""}`.trim()
    : "Entrenador/a";

  const classImage = data.images?.[0] || null;
  const profileImage = instructor?.profileImage || null;

  const category = data.category || "";
  const location = data.location;
  const modality = data.modality;
  const description = data.description;
  const schedule = data.schedule?.[0];
  const price = data.price;

  const navigate = useNavigate();

  return (
    <article className="class-card" onClick={() => navigate(`/class/${data._id}`)}>
      <div className="class-card__images">
        {profileImage && (
          <img src={profileImage} alt={`Perfil de ${instructorName}`} />
        )}
        {classImage && (
          <img  
                className="class-card__image class-card__image--dimmed"
                src={classImage} 
                alt={`Clase de ${instructorName}`} />
        )}
        {category && (
          <span className="class-card__category">{category}</span>
        )}
      </div>

      <div className="class-card__info">
        <h3 className="class-card__name">{instructorName}</h3>

        <p className="class-card__rating" > 
          ⭐ 4.0 <span style={{ color: "#bbb" }}>(16 opiniones)</span>
        </p> 
        
        {(location || modality || description) && (
          <p className="class-card__location class-card__description">
            {location && `${location}`} {modality && `(${modality})`}{" "}
            {description && `- ${description}`}
          </p>
        )}
        
        {schedule && (
            <div className="class-card__time">
                <span className="material-symbols-outlined">schedule</span>
                <span>{schedule.day}: {schedule.from} - {schedule.to}</span>
            </div>
        )}

        {typeof price === "number" && (
          <p className="class-card__price">
            ${price.toLocaleString("es-AR")},00/clase
          </p>
        )}
      </div>
    </article>
  );
}