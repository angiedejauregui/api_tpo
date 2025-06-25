import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TrainerStats.css";

export default function TrainerStatsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const token = localStorage.getItem("token");

        // Obtener perfil del usuario para saber el ID del trainer
        const profile = await axios.get("http://localhost:5000/api/v1/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const id = profile.data._id;
        console.log("trainer id", id);
        // Obtener estadísticas con ese ID
        const res = await axios.get(`http://localhost:5000/api/v1/stats/${id}`);
        console.log("ress", res);
        setStats(res.data);
      } catch (err) {
        console.error("Error cargando estadísticas", err);
      }
    }

    fetchStats();
  }, []);

  if (!stats) return <p className="text-white">Cargando estadísticas...</p>;

  return (
    <div className="stats-page">
    <h2 className="stats-title">Estadísticas Profesor - vista usuario</h2>
  
    <div className="stats-container">
      <div className="comments-section">
        <h3>Comentarios</h3>
        {stats.latestComments.map((comment, index) => (
          <div key={index} className="comment-card">
            <div className="header">
              <strong>{comment.clientName}</strong>
              <p className="mt-2">{comment.comment}</p>
              <fieldset><button className="button-responder-stats">Responder</button></fieldset>
              
            </div>
            
          </div>
        ))}
      </div>
  
      <div className="stats-section">
        <h3>Estadísticas</h3>
        <div className="stat-grid">
          <div>
            <p className="star">⭐ {stats.averageRating.toFixed(1)}</p>
            <p>Calificación promedio</p>
          </div>
          <div>
            <p>{stats.totalReviews}</p>
            <p>Cantidad de calificaciones</p>
          </div>
          <div>
            <p>{stats.views}</p>
            <p>Visualizaciones del servicio</p>
          </div>
          <div>
            <p>{stats.conversionRate.toFixed(1)}%</p>
            <p>Tasa de conversión por servicio</p>
          </div>
        </div>
  
        <div className="rating-distribution">
          <h4>Distribución de calificaciones</h4>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="rating-bar">
              <span>{"⭐".repeat(star)}</span>
              <div className="bar" style={{ width: `${(stats.ratingsDistribution[star] || 0) * 10}px` }}></div>
              <span className="count">{stats.ratingsDistribution[star] || 0}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
}