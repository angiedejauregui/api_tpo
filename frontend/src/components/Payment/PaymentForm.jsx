import React, { useState } from "react";
import "./PaymentForm.css";
import { useNavigate, useParams } from "react-router-dom";

const PaymentForm = ({ classData, selectedSlot, message }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cardNumber || !name || !expiry || !cvv) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const bookingData = {
      serviceId: id,
      selectedSlots: [JSON.stringify(selectedSlot)],
      mensaje: message || "",
      paymentInfo: {
        cardNumber,
        cardHolder: name,
        expirationDate: expiry,
        cvv,
      },
    };

    try {
      const res = await fetch("http://localhost:5000/api/v1/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();

      if (res.ok) {
        navigate("/success");
      } else {
        alert(result.error || "Error al enviar la reserva");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      alert("Error en la solicitud");
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h2>Completar pago</h2>
      <div className="payment-info-box">
        Solo se cobrará si el entrenador acepta tu solicitud.
      </div>

      <label className="payment-label">Tarjeta</label>
      <div className="payment-card-inputs">
        <input
          type="text"
          placeholder="4242 4242 4242 4242"
          className="card-number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="MM/AA"
          className="card-date"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        <input
          type="text"
          placeholder="CVC"
          className="card-cvc"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
      </div>

      <label className="payment-label">Titular</label>
      <input
        type="text"
        className="full-width-input"
        placeholder="Como lo indica la tarjeta"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="submit-button" type="submit">
        Enviar solicitud
      </button>
    </form>
  );
};

export default PaymentForm;
