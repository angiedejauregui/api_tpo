import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./TrainerClassCard.css";
import EditClassInfo from "./EditClassInfo.jsx";
import { updateClass } from "../../../features/updateClases";

export default function TrainerClassCard({ data, onUpdate }) {

  const user = useSelector((state) => state.auth.user);
  const classImage = data.images?.[0] || null;
  const category = data.category || "";
  const schedule = data.disponibilidadHoraria?.[0] || data.schedule?.[0];
  const driveLink = data.archivosAdjuntos || "";

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const [classData, setClassData] = useState(data);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    setClassData(data);
  }, [data]);

  const handleOptions = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    setShowEditForm(true);
  };

  const handleUnpublish = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    alert("Eliminar clase");
  };

  const handleSaveClassChanges = async (updatedData, imageFile ) => {
    try {
      const updatedClass = await updateClass(classData._id, updatedData, imageFile, user.token);

      setClassData(updatedClass);
      setShowEditForm(false);

      if (onUpdate) onUpdate(updatedClass);
    } catch (err) {
      alert("Error al guardar los cambios");
      console.error(err);
    }
  };
  
  const handleViewParticipants = (e) => {
    e.stopPropagation();
    alert("Mostrar participantes");
  };

  const handleOpenDrive = (e) => {
    e.stopPropagation();
    if (driveLink) window.open(driveLink, "_blank");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
    <article className="trainer-class-card">
      <div className="trainer-class-card__images">
        <button className="dots-button" onClick={handleOptions}>
          <span className="material-symbols-outlined">more_vert</span>
        </button>
        {showMenu && (
          <div className="menu-popup" ref={menuRef}>
            <button onClick={handleEdit}>
              Editar
              <span className="material-symbols-outlined menu-simbols">edit</span>
            </button>
            <button onClick={handleUnpublish}>
              Despublicar
              <span className="material-symbols-outlined menu-simbols">schedule</span>
            </button>
          </div>
        )}

        <img
          className="class-card__image"
          src={classImage?`http://localhost:5000${classImage}`: "/imageNotFound.jpg"}
          alt={`Clase de ${category}`}
        />
        
      </div>

      <div className="trainer-class-card__info">
        {category && (
          <span className="trainer-class-card__category">{category}</span>
        )}

        {schedule?.day && (
          <span className="trainer-class-card__day">- {schedule.day}</span>
        )}

        {schedule && (
          <div className="trainer-class-card__time">
            <span className="material-symbols-outlined">schedule</span>
            <span>
              {schedule.from} - {schedule.to || ""}
            </span>
          </div>
        )}

        <div className="trainer-class-card__actions">
          <button onClick={handleOpenDrive}>
            <span className="material-symbols-outlined">folder</span> Ver archivos
          </button>
          <button onClick={handleViewParticipants}>
            <span className="material-symbols-outlined">group</span> Participantes
          </button>
        </div>
      </div>
    </article>
    {showEditForm && (  
      <EditClassInfo
        classData={classData}
        onClose={() => setShowEditForm(false)}
        onSave={(data, file) => handleSaveClassChanges(data, file, classData._id)}
      />)}
    </>
  );
}