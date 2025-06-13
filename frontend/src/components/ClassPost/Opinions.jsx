import React from 'react'

const Opinions = ({ rating, reviews }) => {
  return (
    <div className="opinions">
      <h4>Opiniones</h4>
      {/* <p>⭐ {rating.toFixed(1)} ({reviews.length} opiniones)</p> */}
      {/* {reviews.map((rev, idx) => (
        <div key={idx} className="review">
          <strong>{rev.name}</strong>
          <p>{rev.text}</p>
          <p>⭐ {rev.rating}</p>
        </div>
      ))} */}
    </div>
  )
}

export default Opinions
