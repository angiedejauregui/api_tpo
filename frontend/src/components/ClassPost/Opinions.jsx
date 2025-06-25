import React, { useEffect, useState } from "react";
import axios from "axios";

const Opinions = ({ trainerId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (!trainerId) return;

    axios
      .get(`http://localhost:5000/api/v1/reviews/trainer/${trainerId}`)
      .then((res) => {
        const data = res.data;
        setReviews(data);
        if (data.length > 0) {
          const avg = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
          setAverageRating(avg);
        }
      })
      .catch((err) => console.error("Error cargando opiniones:", err));
  }, [trainerId]);

  return (
    <div className="opinions">
      <div className="opinions-header">
        <h4>Opiniones</h4>
        {reviews.length > 0 && (
          <span className="opinions-average">
            ⭐ {averageRating.toFixed(1)} ({reviews.length} opiniones)
          </span>
        )}
      </div>

      {reviews.map((review, index) => (
        <div className="review-card" key={index}>
          <div className="review-header">
            <strong>
              {review.clientId?.name
                ? `${review.clientId.name} ${review.clientId.lastName ?? ""}`
                : "Usuario"}
            </strong>
            <div className="tars">{"⭐".repeat(review.rating)}</div>
          </div>
          <p className="review-comment">{review.comment}</p>
        </div>
      ))}

      {reviews.length === 0 && (
        <p className="no-reviews">Aún no hay opiniones.</p>
      )}
    </div>
  );
};

export default Opinions;