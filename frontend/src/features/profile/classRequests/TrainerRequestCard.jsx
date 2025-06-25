import React, { useState } from "react";
import { respondToBooking } from "./RequestService.js";
import "./TrainerRequestCard.css";

export default function TrainerRequestCard({ data, onRespond }) {
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleAction = async (action) => {
    setLoading(true);
    try {
      const updated = await respondToBooking(data._id, action, token);
      onRespond(updated.booking);
    } catch (err) {
      alert("Error al procesar la solicitud");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const horario = data.selectedSlots
    ?.map((slot) => `${slot.day} ${slot.from}-${slot.to}`)
    .join(", ");

  const statusColors = {
    Pendiente: "#FB9607",
    Confirmada: "#27922D",
    Cancelada: "#c0392b",
  };

  return (
    <div className="request-card">
      <div className="column">
        <h4 className="category">{data.serviceId?.category}</h4>
        
        <div className="time-row">
          <span className="material-symbols-outlined icon-time">schedule</span>
          <p className="slots"> 
            {(() => {
              try {
                const s = JSON.parse(data.selectedSlots);
                return `${s.day}: ${s.from} - ${s.to}`;
              } catch (err) {
                return "Horario no válido";
              }
            })()}
          </p>
        </div>
        
      </div>

      <div className="column">
        <p> Alumno: {data.clientId?.name} {data.clientId?.lastName}</p>
      </div>

      <div className="column status-actions">
        <span
          className="status"
          style={{ backgroundColor: statusColors[data.status] }}
        >
          {data.status}
        </span>

        {data.status === "Pendiente" && (
          <div className="buttons">
            <button
              className="accept"
              onClick={() => handleAction("accept")}
              disabled={loading}
            >
              Aceptar
            </button>
            <button
              className="cancel"
              onClick={() => handleAction("cancel")}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}