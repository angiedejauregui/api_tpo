import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './ProfileUserView.css';
import ProfileCard from "../../components/profile/ProfileCard";


const ProfileUserView = () => {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    fetch("http://localhost:5000/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error al obtener perfil", err));
  }, []); 
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/v1/bookings/my-bookings", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const allDates = data.flatMap(booking => 
          booking.selectedSlots.map(dateStr => new Date(dateStr).toDateString())
        );
        setBookedDates(allDates);
        setBookings(data);
      })
      .catch((err) => console.error("Error al cargar reservas", err));
  }, []);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toDateString();
      if (bookedDates.includes(dateStr)) {
        
        return "highlight-booked-date";
      }
    }
    return null;
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
            const diasYHoras = selectedSlots.map(slot => {
              const date = new Date(slot);
              return date.toLocaleDateString('es-AR', {
                weekday: 'short',
                hour: '2-digit',
                minute: '2-digit'
              });
            }).join(" / ");

            return (
              <div className="profile-user-view-history-card" key={_id}>
                <img src={serviceId?.images?.[0] || "/imgs/default.jpg"} alt="Clase" />
                <div className="profile-user-view-history-info">
                  <h4>{serviceId?.category}</h4>
                  <p>Profe {trainerId?.name} {trainerId?.lastName}</p>
                  <p>{diasYHoras}</p>
                  <a href={`/services/${serviceId._id}`}>Ver más</a>
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