import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfileClientEdit.css";

const ProfileClientEdit = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/v1/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(({ data }) => {
        setForm({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          birthDate: data.birthDate.split("T")[0]
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `http://localhost:5000/api/v1/users/${JSON.parse(localStorage.getItem("user")).id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/profile/user");
    } catch {
      alert("Error al actualizar perfil");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="profile-client-edit-overlay">
      <div className="profile-client-edit-card">
        <h2 className="profile-client-edit-title">Editar Perfil</h2>
        <form className="profile-client-edit-form" onSubmit={handleSubmit}>
          <label>
            Nombre
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Apellido
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Teléfono
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Fecha de nacimiento
            <input
              name="birthDate"
              type="date"
              value={form.birthDate}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="profile-client-edit--submit">
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileClientEdit;
