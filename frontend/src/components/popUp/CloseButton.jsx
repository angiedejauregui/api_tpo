import React from "react";
import PropTypes from "prop-types";
import "./CloseButton.css";

export default function CloseButton({ onClick, className = "", ariaLabel = "Cerrar" }) {
  return (
    <button
      type="button"
      className={`close-button ${className}`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      x
    </button>
  );
}

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};