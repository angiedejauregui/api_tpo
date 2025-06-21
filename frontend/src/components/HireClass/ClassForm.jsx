import React, { useState } from "react";

const ClassForm = ({ schedule, onSelect }) => {
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const selectedSlot = schedule[e.target.value];
    setSelected(
      `${selectedSlot.day}: ${selectedSlot.from} a ${selectedSlot.to}`
    );
    onSelect(selectedSlot);
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
      <button>Solicitar</button>
    </div>
  );
};

export default ClassForm;
