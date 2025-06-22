import React, { use, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ClassForm.css";

const ClassForm = ({ schedule, onSelect, classData }) => {
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const selectedSlot = schedule[e.target.value];
    const slotDate = {
      day: selectedSlot.day,
      from: selectedSlot.from,
      to: selectedSlot.to,
    };
    setSelected(slotDate);
    onSelect(slotDate);
  };

  const handleSubmit = () => {
    if (!selected) {
      alert("Por favor, seleccione un horario.");
      return;
    }
    console.log("Horario seleccionado:", selected);
    console.log("Mensaje:", message);

    navigate(`/payment/${id}`, {
      state: {
        selectedSlot: slotDate,
        classData,
        message,
      },
    });
  };

  return (
    <div className="hire-class-form">
      <div className="day-time-selector">
        <h3>Seleccione día y horario</h3>
        <select onChange={(e) => handleChange(e)} defaultValue="">
          <option value="" disabled>
            Seleccionar
          </option>
          {schedule.map((slot, index) => (
            <option key={index} value={index}>
              {slot.day}: {slot.from} a {slot.to}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>Mensaje</h3>
        <textarea
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Solicitar</button>
    </div>
  );
};

export default ClassForm;
