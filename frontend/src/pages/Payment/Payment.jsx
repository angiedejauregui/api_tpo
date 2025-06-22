import React, { useEffect, useState } from "react";
import ClassDetails from "../../components/HireClass/ClassDetails";
import { useLocation, useParams } from "react-router-dom";
import PaymentForm from "../../components/Payment/PaymentForm";
import "./Payment.css";

const Payment = () => {
//   const { id } = useParams();
//   const [classData, setClassData] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState(null);
  

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/v1/services/${id}`)
//       .then((res) => res.json())
//       .then((data) => setClassData(data))
//       .catch((err) => console.error("Error al cargar clase:", err));
//   }, [id]);

//   if (!classData) return <p>Cargando clase...</p>;

const { state } = useLocation();

  const classData = state?.classData;
  const selectedSlot = state?.selectedSlot;

  if (!classData) return <p>Cargando clase...</p>;

  return (
    <div className="payment-container">
      <div className="payment-left">
        <ClassDetails
          image={classData.images}
          title={classData.category}
          modality={classData.modality}
          location={classData.location}
          instructor={classData.instructor}
          price={classData.price}
          selectedSlot={selectedSlot}
        />
      </div>
      <div className="payment-right">
        <PaymentForm />
      </div>
    </div>
  );
};

export default Payment;
