import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ServicesHistory.css";

export default function ServicesHistory() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/v1/bookings/by-client", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setBookings(res.data))
      .catch(console.error);
  }, []);

  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");
      // En lugar de DELETE, enviamos un PATCH
      const res = await axios.patch(
        `http://localhost:5000/api/v1/bookings/${id}`,
        { status: "Cancelada" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBookings(bs =>
        bs.map(b => b._id === id ? { ...b, status: res.data.status } : b)
      );
    } catch (err) {
      console.error("Error al cancelar reserva:", err);
    }
  };

  return (
    <div className="services-history-container">
        <h2 className="services-history-title">Mis Clases - Historial</h2>
        {bookings.map(b => (
        <div className="services-history-card-detailed" key={b._id}>
            {/* Información */}
            <div className="services-history-info">
            <div className="services-history-header">
                <h2 className="services-history-category">{b.serviceId.category}</h2>
                <span className={`services-history-status-badge services-history-status-${b.status.toLowerCase()}`}>
                    {b.status}
                </span>
                <button
                    onClick={() => cancelBooking(b._id)}
                    className="services-history-btn-cancel"
                >
                    Cancelar
                </button>
            </div>
        
            <div className="services-history-tags-slots">
                <div className="services-history-tags">
                    <span className="services-history-tag">{b.serviceId.modality}</span>
                    <span className="services-history-tag">{b.serviceId.location}</span>
                </div>
                <div className="services-history-slots">
                    {b.selectedSlots.map((slotStr, idx) => {
                        let slot;
                        try {
                        slot = JSON.parse(slotStr);
                        } catch (e) {
                        console.error("Error parsing slot JSON:", slotStr, e);
                        slot = {};
                        }

                        const key = slot._id || idx;
                        const day = slot.day || "--";
                        const from = slot.from || "--";
                        const to = slot.to || "--";

                        return (
                        <p key={key}>
                            <i className="far fa-clock" /> {day}: {from} – {to}
                        </p>
                        );
                    })}
                </div>

                <p
                    className="services-history-prof-link"
                    onClick={() =>
                    navigate(
                        `/trainer-profile-client-view/${b.trainerId._id}`,
                        { state: { trainer: b.trainerId } } 
                    )
                    }
                >
                    Profe {b.trainerId.name} {b.trainerId.lastName} <i className="fas fa-user" />
                </p>
            </div>
            </div>
        
            {/* Imagen*/}
            <div className="services-history-image-wrapper">
            <img
                className="services-history-image"
                src={b.serviceId.images?.[0] || "/imgs/default.jpg"}
                alt={b.serviceId.category}
            />
            <div className="services-history-rating">
                ⭐ 4.9 (18 opiniones)
            </div>
            </div>
        
            {/* Botones de acciones */}
            <div className="services-history-actions">
                <div className="services-history-actions-left">    
                    <button><p>Ver archivos</p></button>
                </div>
                <div className="services-history-actions-right">    
                <button 
                    onClick={() => navigate(`/class/${b.serviceId._id}`)}
                >
                    <p>Ver publicación original</p>
                </button>
                    <button><p>Dejar comentario</p></button>
                </div>
            </div>
      </div>
      ))}
    </div>
  );
}
