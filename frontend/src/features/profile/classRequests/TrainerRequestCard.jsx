import React, { useState } from "react";
import { respondToBooking } from "./RequestService.js";
import "./TrainerRequestCard.css";

export default function TrainerRequestCard({ data, onRespond }) {
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")); // si no querés usar useSelector

  const handleAction = async (action) => {
    setLoading(true);
    try {
      const updated = await respondToBooking(data._id, action, user.token);
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

  return (
    <div className="trainer-request-card">
        <div>
            <strong>{data.serviceId?.category}</strong>
            <small>{horario}</small>
        </div>
        <div>{data.clientId?.name || "Sin nombre"}</div>
        <div>
            <div className="status">{data.status}</div>
            {data.status === "Pendiente" && (
            <div className="actions">
                <button disabled={loading} onClick={() => handleAction("accept")}>Aceptar</button>
                <button disabled={loading} onClick={() => handleAction("cancel")}>Cancelar</button>
            </div>
            )}
        </div>
    </div>
  );
}