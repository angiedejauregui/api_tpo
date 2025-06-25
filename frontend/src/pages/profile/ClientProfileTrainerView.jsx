import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import ProfileCard from "../../components/profile/ProfileCard";

const ClientProfileTrainerView = () => {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error al obtener perfil", err));
  }, []);

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/v1/bookings/by-client", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const allDates = res.data.flatMap((b) =>
          b.selectedSlots.map((slotStr) => {
            const slot = JSON.parse(slotStr);
            return slot.day.toLowerCase();
          })
        );
        setBookedDates(allDates);
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar reservas:", err);
        setBookedDates([]);
        setBookings([]);
      });
  }, [user]);

  if (!user) return <p>Cargando perfil...</p>;

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return null;
    const dayName = date
      .toLocaleDateString("es-AR", { weekday: "long" })
      .toLowerCase();
    return bookedDates.includes(dayName) ? "highlight-booked-date" : null;
  };

  const titleContent = ({ date, view }) => {
    if (view !== "month") return null;

    const dayStr = date.toDateString();

    const bookingsThatDay = bookings.filter((booking) =>
      booking.selectedSlots.some(
        (slot) => new Date(slot).toDateString() === dayStr
      )
    );

    if (bookingsThatDay.length > 0) {
      const categories = bookingsThatDay
        .map((b) => b.serviceId?.category)
        .filter(Boolean);
      return (
        <div style={{ fontSize: "0.6rem", marginTop: 4, color: "black" }}>
          {categories.join(", ")}
        </div>
      );
    }
    return null;
  };

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="profile-user-view-container">
      <div className="profile-user-view-left-column">
        <div className="profile-user-view-user-profile-card">
          <ProfileCard user={user} hideActions />
        </div>
      </div>
    </div>
  );
};

export default ClientProfileTrainerView;
