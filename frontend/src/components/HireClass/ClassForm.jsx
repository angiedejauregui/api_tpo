import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ClassForm.css";

const ClassForm = ({ schedule, onSelect, classData }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");
  
  const [occupiedSlots, setOccupiedSlots] = useState({});
  
  //traer los espacios ocupados
  useEffect(() => {
    const fetchOccupied = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/classes/${id}/occupied-slots`
        );
        const data = await res.json();
        setOccupiedSlots(data);
      } catch (err) {
        console.error("Error obteniendo slots ocupados:", err);
      }
    };
    if (id) fetchOccupied();
  }, [id]);

  const handleChange = (e) => {
    const slot = schedule[e.target.value];
    const slotDate = { day: slot.day, from: slot.from, to: slot.to };
    setSelected(slotDate);
    onSelect(slotDate);
  };
  /* 
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
*/
  const handleSubmit = () => {
    if (!selected) {
      alert("Por favor, seleccione un horario.");
      return;
    }
    console.log("Horario seleccionado:", selected);
    console.log("Mensaje:", message);

    navigate(`/payment/${id}`, {
      state: {
        selectedSlot: selected,
        classData,
        message,
      },
    });
  };

  return (
    <div className="hire-class-form">
      <div className="day-time-selector">
        <h3>Seleccione día y horario</h3>
        <select onChange={handleChange} defaultValue="">
          <option value="" disabled>
            Seleccionar
          </option>
          {schedule.map((slot, index) => {
            const slotStr = JSON.stringify(slot);
            const used = occupiedSlots[slotStr] || 0;
            const full = used >= classData.capacity;

            return (
              <option key={index} value={index} disabled={full}>
                {slot.day}: {slot.from} a {slot.to}{" "}
                {`(${used}/${classData.capacity})`}
              </option>
            );
          })}
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
