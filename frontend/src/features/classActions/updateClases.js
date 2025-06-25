
export async function fetchClassesByInstructor(userId, token) {
  const res = await fetch(`http://localhost:5000/api/v1/services/by-instructor?instructor=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al cargar clases");

  return res.json();
}

export async function updateClass(classId, updatedData, imageFile, token) {
  const form = new FormData();

  for (const key in updatedData) {
    if (key === "schedule") {
      form.append("schedule", JSON.stringify(updatedData.schedule));
    } else {
      form.append(key, updatedData[key]);
    }
  }

  if (imageFile) {
    form.append("images", imageFile);
  }

  const res = await fetch(`http://localhost:5000/api/v1/services/${classId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  if (!res.ok) throw new Error("Error al actualizar clase");

  return res.json();
}