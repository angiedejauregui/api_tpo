import { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../../components/profile/ProfileCard";

const ProfileUserView = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error al obtener perfil", err));
  }, []);

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="user-profile">
      <ProfileCard user={user} />
      {/* calendario, historial, etc. */}
    </div>
  );
};

export default ProfileUserView;