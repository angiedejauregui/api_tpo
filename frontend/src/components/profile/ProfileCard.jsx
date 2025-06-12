import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ user }) => {
  const { name, lastName, email, phone, birthDate, role, profileImage, cvu } = user;

  const formattedDate = new Date(birthDate).toLocaleDateString("es-AR");

  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src={profileImage} alt="Foto de perfil" />
      </div>
      <div className="profile-details">
        <h2>{name} {lastName}</h2>
        <p>{email}</p>
        <p>{phone}</p>
        {role === "Entrenador" && cvu && (
          <p className="cvu">CVU: {cvu}</p>
        )}
      </div>
      <button 
        className="edit-btn" 
        onClick={() => console.log("Editar perfil")}
      >
        ✏️ Editar
      </button>
    </div>
  );
};

export default ProfileCard;