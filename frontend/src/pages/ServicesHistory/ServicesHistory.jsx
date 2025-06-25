import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../../components/popUp/Modal"; 
import "./ServicesHistory.css";

export default function ServicesHistory() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

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

  const handleSubmitComment = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/v1/reviews",
        {
          bookingId: selectedBooking._id,
          comment,
          rating,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setShowCommentModal(false);
      setComment("");
      setRating(0);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error al enviar comentario", error);
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
                <h2 className="services-history-category">{b.serviceId?.category ?? ""}</h2>
                <span className={`services-history-status-badge services-history-status-${b.status.toLowerCase()}`}>
                    {b.status}
                </span>

                {/* Botón Cancelar sólo se muestra si la clase no está cancelada */}
                {b.status !== "Cancelada" && (
                    <button
                        onClick={() => cancelBooking(b._id)}
                        className="services-history-btn-cancel"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        
            <div className="services-history-tags-slots">
                <div className="services-history-tags">
                    <span className="services-history-tag">{b.serviceId?.modality ?? ""}</span>
                    <span className="services-history-tag">{b.serviceId?.location ?? ""}</span>
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
                src={
                    b.serviceId?.images?.[0]
                    ? `http://localhost:5000${b.serviceId.images[0]}`
                    : "/imageNotFound.jpg"
                }
                alt={b.serviceId?.category ?? ""}
            />
            <div className="services-history-rating">
                ⭐ 4.9 (18 opiniones)
            </div>
            </div>
        
            {/* Botones de acciones */}
            <div className="services-history-actions">
                {/* Botón “Ver archivos” sólo si está confirmada */}
                {b.status === "Confirmada" && (
                    <div className="services-history-actions-left">
                    {b.serviceId?.attachmentLink
                        ? (
                        <button
                            className="services-history-btn-file"
                            onClick={() =>
                            window.open(b.serviceId.attachmentLink, "_blank", "noopener,noreferrer")
                            }
                        >
                            Ver archivos
                        </button>
                        )
                        : (
                        <button className="services-history-btn-file" disabled>
                            Sin archivos
                        </button>
                        )
                    }
                    </div>
                )}

                {/* Botones de “Ver publicación original” y “Dejar comentario” */}
                <div className="services-history-actions-right">
                    <button onClick={() => navigate(`/class/${b.serviceId._id}`)}>
                    Ver publicación original
                    </button>

                    {/* “Dejar comentario” sólo si está confirmada */}
                    {b.status === "Confirmada" && (
                        <button
                            onClick={() => {
                            setSelectedBooking(b);
                            setShowCommentModal(true);
                            }}
                            >
                            Dejar comentario
                        </button>
                    )}
                </div>
            </div>
       </div>
       ))}

        {/* Pop Up para dejar comentario */}
        {showCommentModal && (
        <Modal onClose={() => setShowCommentModal(false)} width="30%" titleId="services-history-comment-title">
            <div className="services-history-comment-popup">
            <h3 className="services-history-comment-title" id="services-history-comment-title">Deja tu comentario</h3>
            <div className="services-history-comment-stars">
                {[1, 2, 3, 4, 5].map((i) => (
                <span
                    key={i}
                    onClick={() => setRating(i)}
                    className={`services-history-star ${i <= rating ? "services-history-star-filled" : ""}`}
                >
                ★
              </span>
                ))}
            </div>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escribí tu comentario..."
                className="services-history-comment-txt"
            />
            <button
                onClick={handleSubmitComment}
                className="services-history-comment-submit"
            >
                <h3 className="services-history-comment-submit-txt">Publicar</h3>
            </button>
            </div>
        </Modal>
        )}

    </div>
    


  );
}
