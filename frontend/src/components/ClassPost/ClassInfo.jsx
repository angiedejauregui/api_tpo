import React from "react";
import "./ClassInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import HireClass from "../../pages/HireClass/HireClass";

const ClassInfo = ({ trainer, price }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  /*const user = JSON.parse(localStorage.getItem("user"))*/
  const { id } = useParams();
  const navigate = useNavigate();

  const handleTrainerClick = () => {
    if (user?.role === "Cliente") {
      navigate(`/trainer-profile-client-view/${trainer._id}`, {
        state: { trainer } 
      });
    }
  };

  return (
    <div className="class-info">
      <div className="trainer-info" onClick={handleTrainerClick} style={{ cursor: user?.role === "Cliente" ? "pointer" : "default" }}>
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
        <button className="cta" onClick={() => navigate(`/hire-class/${id}`)}>
          CONTRATAR CLASE
        </button>
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
            <span className="material-symbols-outlined unpublish-icon">
              history
            </span>
            Despublicar
          </button>
        </div>
      )}
    </div>
  );
};

export default ClassInfo;
