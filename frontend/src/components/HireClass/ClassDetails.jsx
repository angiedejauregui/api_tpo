import React from "react";
import "./ClassDetails.css";

const ClassDetails = ({
  image,
  title,
  modality,
  location,
  instructor,
  price,
  selectedSlot,
}) => {
  return (
    <div className="hire-class-details">
      <img src={`http://localhost:5000${image}`} alt={title} />
      <h2>{title.toUpperCase()}</h2>
      <div className="tags">
        <span className="tag">{modality}</span>
        <span className="tag">{location}</span>
      </div>
      <p>
        <strong>Profesor:</strong> {instructor.name} {instructor.lastName}
      </p>
      {selectedSlot && (
        <div className="selected-slot">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#FFFDFD"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 6V12L16 14"
              stroke="#FFFDFD"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>{" "}
          <p>
            {selectedSlot.day}: {selectedSlot.from} a {selectedSlot.to}
          </p>
        </div>
      )}
      <h3 className="hire-class-details-price">${price}</h3>
    </div>
  );
};

export default ClassDetails;
