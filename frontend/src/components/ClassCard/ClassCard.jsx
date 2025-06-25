import React, { useState, useEffect } from "react";
import './ClassCard.css';
import { useNavigate } from "react-router-dom";


export default function ClassCard({ data }) {
  const instructor = data.instructor;
  const instructorName = instructor
    ? `${instructor.name || ""} ${instructor.lastName || ""}`.trim()
    : "Entrenador/a";

  const classImage = data.images?.[0] || null;
  const isValidImage = classImage && classImage.trim() !== "";
  const imageSrc = isValidImage ? `http://localhost:5000${classImage}` : "/imageNotFound.jpg";

  const profileImage = instructor?.profileImage || null;
  const category = data.category || "";
  const location = data.location;
  const modality = data.modality;
  const description = data.description;
  const schedule = data.schedule?.[0];
  const price = data.price;

  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
const [avgRating, setAvgRating] = useState(0);

const handleClick = async () => {
  try {
    await fetch(`http://localhost:5000/api/v1/stats/views/${instructor._id}`, {
      method: "PATCH",
    });
  } catch (err) {
    console.error("Error actualizando vistas", err);
  }
  navigate(`/class/${data._id}`);
};

useEffect(() => {
  const fetchReviews = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/reviews/trainer/${instructor._id}`);
      const data = await res.json();
      setReviews(data);
      const avg = data.length > 0
        ? data.reduce((sum, r) => sum + r.rating, 0) / data.length
        : 0;
      setAvgRating(avg);
    } catch (error) {
      console.error("Error cargando reviews", error);
    }
  };


  if (instructor?._id) fetchReviews();
}, [instructor?._id]);

  return (
    <article className="class-card" onClick={handleClick}>
      <div className="class-card__images">
        {profileImage && (
          <img src={profileImage} alt={`Perfil de ${instructorName}`} />
        )}
        <img  
          className="class-card__image class-card__image--dimmed"
          src= {imageSrc} 
          alt={`Clase de ${instructorName}`} 
        />
        {category && (
          <span className="class-card__category">{category}</span>
        )}
      </div>

      <div className="class-card__info">
        <h3 className="class-card__name">{instructorName}</h3>

        <p className="class-card__rating">⭐ {avgRating.toFixed(1)} <span className="class-card-opinion-txt">({reviews.length} opiniones)</span></p>

        
        {(location || modality || description) && (
          <p className="class-card__location class-card__description">
            {location && `${location}`} {modality && `(${modality})`}{" "}
            {description && `- ${description}`}
          </p>
        )}
        
        {data.schedule?.length > 0 && (
          <div className="class-card__time-row">
            {data.schedule.map((s, idx) => (
              <span key={idx} className="class-card__time-item">
                <span className="material-symbols-outlined">schedule</span>
                {s.day}: {s.from} - {s.to} /
              </span>
            ))}
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