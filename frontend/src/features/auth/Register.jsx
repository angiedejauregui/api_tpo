import React, { useEffect, useState } from "react";
import "./auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./AuthSlice";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    lastName: "",
    phone: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Cliente",
    cvu: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "auth/registerUser/pending" });
    setTimeout(() => {
      dispatch(registerUser(inputs));
    }, 1500);
  };

  useEffect(() => {
    if (message === "Usuario registrado correctamente") {
      navigate("/login");
    }
  }, [message]);

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          {error && <p className="error">{error}</p>}
          <h2>Registrarse</h2>
          <p className="description">Completar los detalles</p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={(e) => handleChange(e)}
              placeholder="Nombre"
            />
            <input
              type="text"
              name="lastName"
              value={inputs.lastName}
              onChange={(e) => handleChange(e)}
              placeholder="Apellido"
            />
          </div>
          <input
            type="text"
            name="phone"
            value={inputs.phone}
            onChange={(e) => handleChange(e)}
            placeholder="Teléfono"
          />
          <input
            type="date"
            name="birthDate"
            value={inputs.birthDate}
            onChange={(e) => handleChange(e)}
            placeholder="Fecha de nacimiento"
          />
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
          <div className="container-radio">
            <label htmlFor="cliente">
              <input
                type="radio"
                id="cliente"
                name="role"
                value="Cliente"
                checked={inputs.role === "Cliente"}
                onChange={(e) => handleChange(e)}
              />
              Cliente
            </label>
            <label htmlFor="entrenador">
              <input
                type="radio"
                id="entrenador"
                name="role"
                value="Entrenador"
                checked={inputs.role === "Entrenador"}
                onChange={(e) => handleChange(e)}
              />
              Entrenador
            </label>
            {inputs.role === "Entrenador" && (
              <label htmlFor="cvu">
                <input
                  type="text"
                  id="cvu"
                  name="cvu"
                  placeholder="CVU"
                  value={inputs.cvu}
                  onChange={(e) => handleChange(e)}
                />
              </label>
            )}
          </div>
          <button className="submit" type="submit">
            {loading ? "Cargando..." : "Registrame"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
