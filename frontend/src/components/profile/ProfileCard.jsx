import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ user }) => {
  const { name, lastName, email, phone, birthDate, role, profileImage, description } = user;

  const formattedDate = new Date(birthDate).toLocaleDateString("es-AR");

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
      <button 
        className="edit-btn" 
        onClick={() => console.log("Editar perfil")}
      >
        <span class="material-symbols-outlined edit-icon">edit</span>
        Editar
      </button>
    </div>
  );
};

export default ProfileCard;