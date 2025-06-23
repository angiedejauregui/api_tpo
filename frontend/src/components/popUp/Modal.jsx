import React, { useEffect } from "react";
import PropTypes from "prop-types";
import CloseButton from "./CloseButton";
import "./Modal.css";

export default function Modal({ children, onClose, width = "500px", titleId }) {
  // Evitar scroll del body cuando el modal está abierto:
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Cerrar al presionar Esc:
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  // Cerrar al clickear en el overlay (fuera del contenido)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal-content"
        style={{ maxWidth: width }}
        role="dialog"
        aria-modal="true"
        {...(titleId ? { "aria-labelledby": titleId } : {})}
      >
        <CloseButton onClick={onClose} />
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  width: PropTypes.string, // ej. "500px", "90%", etc.
  titleId: PropTypes.string, // si quieres enlazar <h2 id={titleId}> para aria-labelledby
};