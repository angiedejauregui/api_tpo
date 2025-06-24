import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './ProfileUserView.css';
import ProfileCard from "../../components/profile/ProfileCard";
import axios from "axios";
import { Link } from "react-router-dom";


const ProfileUserView = () => {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    axios
      .get("http://localhost:5000/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Error al obtener perfil", err));
    }, []); 
  
  useEffect(() => {
    if (!user) return; 
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/v1/bookings/by-client", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
       .then(res => {
        const allDates = res.data.flatMap(b =>
          b.selectedSlots.map(slotStr => {
            const slot = JSON.parse(slotStr);
            return slot.day.toLowerCase(); 
          })
        );
        setBookedDates(allDates);
        setBookings(res.data);
      })
        .catch(err => {
          console.error("Error al cargar reservas:", err);
          setBookedDates([]);
          setBookings([]);
        });
    }, [user]);

  if (!user) return <p>Cargando perfil...</p>;

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return null;
    const dayName = date.toLocaleDateString("es-AR", { weekday: "long" }).toLowerCase();
    return bookedDates.includes(dayName)
      ? "highlight-booked-date"
      : null;
  };

  const titleContent = ({ date, view }) => {
    if (view !== 'month') return null;

    const dayStr = date.toDateString();

    const bookingsThatDay = bookings.filter(booking =>
      booking.selectedSlots.some(slot => new Date(slot).toDateString() === dayStr)
    );

    if (bookingsThatDay.length > 0) {
      const categories = bookingsThatDay.map(b => b.serviceId?.category).filter(Boolean);
      return (
        <div style={{ fontSize: '0.6rem', marginTop: 4, color: 'black' }}>
          {categories.join(", ")}
        </div>
      );
    }
    return null;
  };  

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="profile-user-view-container">
      <div className="profile-user-view-left-column">
        <div className="profile-user-view-user-profile-card">
          <ProfileCard user={user} />
        </div>
      
        <div className="profile-user-view-calendar-box">
        <Calendar 
            onChange={setValue}
            value={value}
            tileClassName={tileClassName}
            titleContent={titleContent}
          />
       </div>
      </div>

      <div className="profile-user-view-right-column">
        <h3 className="profile-user-view-subtitle">Historial</h3>

        {bookings.length === 0 ? (
          <p>No hay clases reservadas aún.</p>
        ) : (
          bookings.map((booking) => {
            const { _id, serviceId, selectedSlots, trainerId } = booking;
            const diasYHoras = selectedSlots
              .map(slotStr => {
                const slot = JSON.parse(slotStr);
                const date = new Date(slot.date);
                return `${slot.day}: ${slot.from} - ${slot.to}`;
              })
              .join(" / ");


            return (
              <div className="profile-user-view-history-card" key={_id}>
                <img 
                  src={
                    serviceId?.images?.[0]
                    ? `http://localhost:5000${serviceId.images[0]}` 
                    : "/imageNotFound.jpg"
                  }
                  alt={serviceId.category}
                />

                <div className="profile-user-view-history-info">
                  <h4>{serviceId?.category}</h4>
                  <p>Profe {trainerId?.name} {trainerId?.lastName}</p>
                  <p>{diasYHoras}</p>
                  <Link className="profile-user-view-btn-more" to="/history">
                    Ver más
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProfileUserView;