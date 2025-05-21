import React from "react";
import { useNavigate } from "react-router-dom";

const PasswordCreated = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>¡Contraseña creada!</h2>\{" "}
      <button onClick={() => navigate("/login")}>Iniciar sesión</button>
    </div>
  );
};

export default PasswordCreated;
