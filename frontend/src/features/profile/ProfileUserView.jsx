import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './ProfileUserView.css';
import ProfileCard from "../../components/profile/ProfileCard";


const ProfileUserView = () => {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState(new Date());

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
    <div className="user-view-container">
      <div className="left-column">
        <div className="user-profile-card">
          <ProfileCard user={user} />
        </div>
      
        <div className="calendar-box">
         <Calendar onChange={setValue} value={value} />
         {/* esto después hay que hacer que se pinte de color la fecha que tiene alguna clase reservada*/}
       </div>
      </div>

      <div className="right-column">
        <h3  className="subtitle">Historial</h3>
        <div className="history-card">
          <img src="/imgs/pilates.jpg" alt="Clase" />
          <div className="history-info">
            <h4>Pilates</h4>
            <p>Profe Juana Montés</p>
            <p>Lun y Mié - 17:00 a 19:00</p>
            <a href="#">Ver más</a>
          </div>
        </div>
        <div className="history-card">
          <img src="/imgs/pilates.jpg" alt="Clase" />
          <div className="history-info">
            <h4>Pilates</h4>
            <p>Profe Juana Montés</p>
            <p>Lun y Mié - 17:00 a 19:00</p>
            <a href="#">Ver más</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUserView;