import React from 'react'
import { useNavigate } from 'react-router-dom';
import './SuccessScreen.css';

const SuccessScreen = () => {
    const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-card">
        <svg
          className="success-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00c851"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>

        <h2>Solicitud Enviada</h2>
        <p>
          Tu solicitud fue enviada con éxito! Solo se cobrará si el entrenador
          acepta. Te avisaremos por mail y en la plataforma.
        </p>
        <button onClick={() => navigate("/")}>Volver al Inicio</button>
      </div>
    </div>
  )
}

export default SuccessScreen