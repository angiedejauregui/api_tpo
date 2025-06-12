import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const role = res.data.role;
      if (role === "Entrenador") {
        navigate("/profile/trainer");
      } else {
        navigate("/profile/user");
      }
    })
    .catch((err) => {
      console.error("Error al redirigir perfil", err);
      navigate("/login");
    })
    .finally(() => setLoading(false));
  }, [navigate]);

  return loading ? <p>Cargando perfil...</p> : null;
};

export default ProfilePage;