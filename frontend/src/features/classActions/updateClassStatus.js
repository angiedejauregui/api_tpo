export const updateClassStatus = async (classId, status, token) => {
  const res = await fetch(`http://localhost:5000/api/v1/services/${classId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error("Error al cambiar el estado");
  return res.json();
};
