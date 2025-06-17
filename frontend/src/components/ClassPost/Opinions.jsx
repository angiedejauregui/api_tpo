import React from 'react'

const Opinions = ({ rating, reviews }) => {
  
  return (
   <div className="opinions">
      <div className="opinions-header">
        <h4>Opiniones</h4>
        {reviews?.length > 0 && (
          <span className="opinions-average">
            ⭐ {rating.toFixed(1)} ({reviews.length} opiniones)
          </span>
        )}
      </div>

      {reviews?.map((review, index) => (
        <div className="review-card" key={index}>
          <div className="review-header">
            <strong>{review.user?.name || "Usuario"}</strong>
            <div className="stars">
              {"⭐".repeat(review.rating)}
            </div>
          </div>
          <p className="review-comment">{review.comment}</p>
        </div>
      ))}

      {(!reviews || reviews.length === 0) && (
        <p className="no-reviews">Aún no hay opiniones.</p>
      )}
    </div>
  )
}

export default Opinions
