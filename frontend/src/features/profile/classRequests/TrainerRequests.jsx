import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBookingsByTrainer } from "./RequestService.js";
import TrainerRequestCard from "./TrainerRequestCard";

function formatDateGroup(date) {
  const today = new Date();
  const d = new Date(date);
  if (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  ) return "Hoy";
  return d.toLocaleDateString("es-AR", { day: "numeric", month: "long" });
}

export default function TrainerRequests() {
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchRequests = async () => {
        try {
        
        const data = await getBookingsByTrainer(user.id, token);

        setRequests(data);
      } catch (err) {
        console.error("Error cargando solicitudes:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  const handleResponse = (updatedBooking) => {
    setRequests((prev) =>
      prev.map((req) =>
        req._id === updatedBooking._id ? updatedBooking : req
      )
    );
  };

  if (loading) return <p>Cargando solicitudes...</p>;

  const grouped = requests.reduce((acc, booking) => {
  const groupName = formatDateGroup(booking.createdAt);
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(booking);
    return acc;
  }, {});

  return (
    <section className="trainer-requests">
        {requests.length === 0 ? (
        <p>No tenés solicitudes pendientes.</p>
        ) : (
        Object.entries(grouped).map(([dateGroup, bookings]) => (
            <div key={dateGroup}>
            <h2>{dateGroup}</h2>
            {bookings.map((booking) => (
                <TrainerRequestCard
                key={booking._id}
                data={booking}
                onRespond={handleResponse}
                />
            ))}
            </div>
        ))
        )}
    </section>
  );
}