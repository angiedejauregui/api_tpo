import React from "react";
import "./ClassInfo.css";

const ClassInfo = ({ trainer, price }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  /*const user = JSON.parse(localStorage.getItem("user"))*/
  return (
    <div className="class-info">
      <div className="trainer-info">
        <img
          src={trainer.profileImage}
          alt={trainer.name}
          className="trainer-photo"
        />
        <h2>
          {trainer.name} {trainer.lastName}
        </h2>
        <p>{trainer.descripcion}</p>
      </div>
      <div className="price-box">
        <p>Precio de la Clase:</p>
        <h2>${price.toLocaleString()}</h2>
      </div>
      {/*<button className="cta">CONTRATAR CLASE</button>*/}
      {user?.role === "Cliente" ? (
        <button className="cta">CONTRATAR CLASE</button>
      ) : (
        <div className="trainer-actions">
          <button 
            className="edit-btn" 
            onClick={() => console.log("Editar perfil")}
          >
            <span className="material-symbols-outlined edit-icon">edit</span>
            Editar
          </button>
          <button className="unpublish-btn">
            <span className="material-symbols-outlined unpublish-icon">history</span>
            Despublicar
          </button>
        </div>
      )}
    </div>
  );
};

export default ClassInfo;
