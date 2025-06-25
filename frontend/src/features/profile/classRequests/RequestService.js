const BASE_URL = "http://localhost:5000/api/v1/bookings";

export async function getBookingsByTrainer(trainerId, token) {
  const res = await fetch(`${BASE_URL}/by-trainer?trainerId=${trainerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al cargar solicitudes");

  return res.json();
}

export async function respondToBooking(id, action, token) {
  const res = await fetch(`${BASE_URL}/${id}/${action}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al actualizar estado de la solicitud");

  return res.json();
};