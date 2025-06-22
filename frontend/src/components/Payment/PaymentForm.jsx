import React, { useState } from "react";
import "./PaymentForm.css";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardNumber || !name || !expiry || !cvv) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    console.log({ cardNumber, name, expiry, cvv });
  };

  return (
    <form className="payment-form">
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
        />
        <input type="text" placeholder="MM/AA" className="card-date" />
        <input type="text" placeholder="CVC" className="card-cvc" />
      </div>

      <label className="payment-label">Titular</label>
      <input
        type="text"
        className="full-width-input"
        placeholder="Como lo indica la tarjeta"
      />

      <button className="submit-button" type="submit" onClick={handleSubmit}>
        Enviar solicitud
      </button>
    </form>
  );
};

export default PaymentForm;
