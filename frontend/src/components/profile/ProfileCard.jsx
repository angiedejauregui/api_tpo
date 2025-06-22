import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ user }) => {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const { name, lastName, email, phone, birthDate, role, profileImage, description } = user;

  const formattedDate = new Date(birthDate).toLocaleDateString("es-AR");
/* esto para que solo le muestre el botón editar si el usuario logueado es el mismo del profile card, o sea que solo deje modificar propios profile card*/
  const isOwner = loggedUser && loggedUser.id === user._id;

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-image">
          <img src={profileImage} alt="Foto de perfil" />
        </div>
        <div className="profile-details">
          <h2>{name} {lastName}</h2>
          <hr className="divider" />
          <p>{email}</p>
          <p>{phone}</p>
        </div>
      </div>
      <hr className="divider" />
        <p>{description}</p>

      {isOwner && (
        <button
          className="edit-btn"
          onClick={() => console.log("Editar perfil")}
        >
          <span className="material-symbols-outlined edit-icon">edit</span>
          Editar
        </button>
      )}
    </div>
  );
};

export default ProfileCard;