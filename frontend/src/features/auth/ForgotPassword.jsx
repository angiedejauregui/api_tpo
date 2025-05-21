import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "./AuthSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "auth/forgotPassword/pending" });
    setTimeout(() => {
      dispatch(forgotPassword({ email }));
    }, 1500);
  };

  useEffect(() => {
    if (message) {
      localStorage.setItem("recoveryEmail", email);
      navigate("/verify-code");
    }
  }, [message]);

  return (
    <>
      <div className="container">
        <h2>Recibir código de acceso por email</h2>
        {error && <p className="error">{error}</p>}
        <p className="description">
          Vas a recibir un código de verificación en tu correo electrónico
        </p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
          />
          <button type="submit">
            {loading ? "Enviando..." : "Recibir codigo"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
