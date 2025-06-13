import React from "react";

const ClassInfo = ({ trainer, price }) => {
  return (
    <div className="class-info">
      <div className="trainer-info">
        <img
          src={trainer.profileImage}
          alt={trainer.name}
          className="trainer-photo"
        />
        <h3>
          {trainer.name} {trainer.lastName}
        </h3>
        {/* <p>{trainer.bio}</p> */}
      </div>
      <div className="price-box">
        <p>Precio de la Clase:</p>
        <h2>${price.toLocaleString()}</h2>
      </div>
      <button className="cta">CONTRATAR CLASE</button>
    </div>
  );
};

export default ClassInfo;
