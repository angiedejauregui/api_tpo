import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./auth.css";
import { loginUser } from "./AuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "auth/loginUser/pending" });
    setTimeout(() => {
      dispatch(loginUser(inputs));
    }, 1500);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <div className="container">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <p className="description">Ingresa con tu correo y contraseña</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={(e) => handleChange(e)}
            placeholder="Email"
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={(e) => handleChange(e)}
            placeholder="Contraseña"
            autoComplete="current-password"
          />
          <button type="submit">
            {loading ? "Cargando..." : "Iniciar sesion"}
          </button>
        </form>
        <div>
          <p className="mensaje-registro">¿No tenes una cuenta aun?</p>
          <button
            onClick={() => navigate("/register")}
            className="btn-registro"
          >
            Registrarme
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
