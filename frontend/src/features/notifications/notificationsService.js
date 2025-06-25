const BASE = "http://localhost:5000/api/v1/notifications";

export async function fetchNotifications(token) {
  const res = await fetch(BASE, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Error al traer notificaciones");
  return res.json();
}

export async function sendNotification(userId, message, token) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, message })
  });
  if (!res.ok) throw new Error("Error al enviar notificación");
  return res.json();
}

export async function readNotification(id, token) {
  const res = await fetch(`${BASE}/${id}/read`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al marcar como leída");
  return res.json();
}