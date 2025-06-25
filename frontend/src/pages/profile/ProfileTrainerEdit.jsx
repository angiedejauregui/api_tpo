import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../../components/popUp/Modal";
import "./ProfileTrainerEdit.css";

const ProfileTrainerEdit = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    description: "",
    cvu: ""
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
          birthDate: data.birthDate.split("T")[0],
          description: data.description || "",
          cvu: data.cvu || ""
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
      navigate("/profile/trainer");
    } catch (err) {
      alert("Error al actualizar perfil");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <Modal onClose={() => navigate(-1)} titleId="edit-profile-trainer-title" width="30%">
      <h2 id="edit-profile-trainer-title">Editar Perfil</h2>
      <form className="profile-trainer-popup-form" onSubmit={handleSubmit}>
        <label>Nombre
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>Apellido
          <input name="lastName" value={form.lastName} onChange={handleChange} required />
        </label>
        <label>Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>Teléfono
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </label>
        <label>Fecha de nacimiento
          <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} required />
        </label>
        <label>CVU
          <input name="cvu" value={form.cvu} onChange={handleChange} required />
        </label>
        <label>Descripción
          <textarea name="description" value={form.description} onChange={handleChange} />
        </label>
        <button type="submit" className="profile-trainer-popup-submit-btn">Confirmar</button>
      </form>
    </Modal>
  );
};

export default ProfileTrainerEdit;
