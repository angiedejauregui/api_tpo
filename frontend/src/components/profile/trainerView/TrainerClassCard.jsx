import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./TrainerClassCard.css";
import EditClassInfo from "../../../features/classActions/EditClassInfo.jsx";
import { updateClass } from "../../../features/classActions/updateClases.js";
import { updateClassStatus } from "../../../features/classActions/updateClassStatus.js";


export default function TrainerClassCard({ data, onUpdate, isArchiveView = false }) {

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

  const handleUnpublish = async (e) => {
    e.stopPropagation();
    const confirm = window.confirm("¿Archivar esta clase?");
    if (!confirm) return;

    try {
      const updated = await updateClassStatus(classData._id, "unpublished", user.token);
      onUpdate?.(updated);
      alert("Clase archivada con éxito");
    } catch (err) {
      console.error(err);
      alert("Error al archivar la clase");
    }
  };

  const handleRepublish = async (e) => {
    e.stopPropagation();
    const confirm = window.confirm("¿Volver a publicar esta clase?");
    if (!confirm) return;

    try {
        const updated = await updateClassStatus(classData._id, "published", user.token);
        onUpdate?.(updated);
        alert("Clase publicada nuevamente");
    } catch (err) {
        console.error(err);
        alert("Error al publicar la clase");
    }
  };

  const handlePermanentDelete = async (e) => {
    e.stopPropagation();
    const confirm = window.confirm("¿Eliminar esta clase de forma permanente?");
    if (!confirm) return;

    try {
      const updated = await updateClassStatus(classData._id, "deleted", user.token);
      alert("Clase eliminada permanentemente");
      onUpdate?.({ _id: updated._id, deleted: true });
    } catch (err) {
      console.error(err);
      alert("Error al eliminar la clase");
    }
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
        {!isArchiveView && (
          <button className="dots-button" onClick={handleOptions}>
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        )}
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

        {classData.schedule?.length > 0 && (
          <div className="trainer-class-card__schedules">
            {classData.schedule.map((s, idx) => (
              <span key={idx} className="trainer-class-card__schedule-item">
                <span className="material-symbols-outlined schedule-icon">schedule</span>
                {s.day}: {s.from} - {s.to} /
              </span>
            ))}
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
        {isArchiveView && classData.status === "unpublished" && (
          <div className="trainer-class-card__archive-actions">
            <button className="republish-btn" onClick={handleRepublish}>
              Restaurar Publicación
            </button>
            <button className="delete-btn" onClick={handlePermanentDelete}>
              Eliminar Permanentemente
            </button>
          </div>
        )}


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