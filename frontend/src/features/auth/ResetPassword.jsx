import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "./AuthSlice";

const ResetPassword = () => {
  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message } = useSelector((state) => state.auth);

  const email = localStorage.getItem("recoveryEmail");

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "auth/resetPassword/pending" });
    setTimeout(() => {
      dispatch(
        resetPassword({
          email,
          newPassword: inputs.password,
          confirmPassword: inputs.confirmPassword,
        })
      );
    }, 1500);
  };

  useEffect(() => {
    if (message == "Tu contraseña fue actualizada correctamente.") {
      navigate("/password-created");
      localStorage.removeItem("recoveryEmail");
    }
  }, [message]);

  return (
    <>
      <div className="container">
        <h2>Crear nueva contraseña</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={inputs.password}
            onChange={(e) => handleChange(e)}
            autoComplete="new-password"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={inputs.confirmPassword}
            onChange={(e) => handleChange(e)}
            autoComplete="new-password"
          />
          <button type="submit">{loading ? "Creando..." : "Continuar"}</button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
