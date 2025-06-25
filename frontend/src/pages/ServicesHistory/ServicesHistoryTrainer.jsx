import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ServicesHistoryTrainer.css";

export default function ServicesHistoryTrainer() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/v1/bookings/by-trainer", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error al obtener clases:", err));
  }, []);

  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `http://localhost:5000/api/v1/bookings/${id}`,
        { status: "Cancelada" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: res.data.status } : b))
      );
    } catch (err) {
      console.error("Error al cancelar:", err);
    }
  };

  return (
    <div className="services-trainer-container">
      <h2 className="services-trainer-title">Mis Clases</h2>
      {bookings.map((b) => (
        <div className="services-trainer-card" key={b._id}>
          <div className="services-trainer-left">
            <h2 className="services-trainer-category">
              {b.serviceId?.category}
            </h2>
            <p
              className="services-trainer-alumno"
              onClick={() =>
                navigate(`/client-profile-trainer-view/${b.clientId._id}`, {
                  state: { student: b.clientId },
                })
              }
            >
              <i className="fas fa-user" /> Alumno: {b.clientId?.name}{" "}
              {b.clientId?.lastName}
            </p>

            <p className="services-trainer-horario">
              <i className="far fa-clock" />
              {(() => {
                try {
                  const slot = JSON.parse(b.selectedSlots[0]);
                  return ` ${slot.day}: ${slot.from} a ${slot.to}`;
                } catch {
                  return "";
                }
              })()}
            </p>

            <div className="services-trainer-tags">
              <span className="tag">{b.serviceId?.modality}</span>
              <span className="tag">{b.serviceId?.location}</span>
              <button
                className="services-trainer-btn"
                onClick={() => navigate(`/class/${b.serviceId?._id}`)}
              >
                Ver publicación original
              </button>
            </div>
          </div>

          <div className="services-trainer-right">
            {b.serviceId?.attachmentLink ? (
              <button
                className="services-trainer-file-btn"
                onClick={() =>
                  window.open(
                    b.serviceId.attachmentLink,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <svg
                className="services-trainer-file-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H10L12 6H20C20.55 6 21.0208 6.19583 21.4125 6.5875C21.8042 6.97917 22 7.45 22 8V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM4 18H20V8H11.175L9.175 6H4V18Z"
                    fill="white"
                  />
                </svg>
                Ver archivos
              </button>
            ) : (
              <button className="services-trainer-file-btn" disabled>
                Sin archivos
              </button>
            )}

            {b.status !== "Cancelada" && (
              <button
                className="services-trainer-cancel-btn"
                onClick={() => cancelBooking(b._id)}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
