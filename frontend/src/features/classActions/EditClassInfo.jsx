import React, { useState, useRef, useEffect } from "react";

export default function EditClassInfo({ classData, onClose, onSave }) {
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    category: classData.category || "",
    description: classData.description || "",
    price: classData.price || "",
    modality: classData.modality || "",
    language: classData.language || "",
    location: classData.location || "",
    capacity: classData.capacity || 1,
    attachmentLink: classData.attachmentLink || "",
    schedule: typeof classData.schedule === "string"
      ? JSON.parse(classData.schedule)
      : classData.schedule || [{ day: "", from: "", to: "" }],
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(classData.images?.[0] ? `http://localhost:5000${classData.images[0]}` : null);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleScheduleChange = (index, field, value) => {
    const newSchedule = [...formData.schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setFormData((f) => ({ ...f, schedule: newSchedule }));
  };

  const handleAddSchedule = () => {
    setFormData((f) => ({
      ...f,
      schedule: [...f.schedule, { day: "", from: "", to: "" }],
    }));
  };

  const handleRemoveSchedule = (index) => {
    const newSchedule = [...formData.schedule];
    newSchedule.splice(index, 1);
    setFormData((f) => ({ ...f, schedule: newSchedule }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData, imageFile);
  };

  return (
    <div className="new-class-overlay">
      <div className="new-class-modal">
        <h2>Editar Publicación</h2>
        <button className="close-btn" onClick={onClose}>✕</button>

        <form onSubmit={handleSubmit}>
          <div className="form-columns">

            <div className="form-left">

              <div className="form-field">
                <label>Imagen</label>
                <div className="input-wrapper image-box" onClick={() => fileInputRef.current.click()}>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  {imagePreview ? (
                    <img src={imagePreview} alt="Previsualización" />
                  ) : (
                    <span className="material-symbols-outlined image-icon">add_photo_alternate</span>
                  )}
                </div>
              </div>

              <div className="form-field">
                <label>Disponibilidad Horaria</label>
                {formData.schedule.map((item, idx) => (
                  <div className="input-wrapper schedule-row" key={idx}>
                    <select
                      value={item.day}
                      onChange={(e) => handleScheduleChange(idx, "day", e.target.value)}
                    >
                      <option value="">Día</option>
                      {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <input
                      type="time"
                      value={item.from}
                      onChange={(e) => handleScheduleChange(idx, "from", e.target.value)}
                    />
                    <input
                      type="time"
                      value={item.to}
                      onChange={(e) => handleScheduleChange(idx, "to", e.target.value)}
                    />
                    <button type="button" onClick={() => handleRemoveSchedule(idx)}>✕</button>
                  </div>
                ))}
                <button type="button" className="add-btn" onClick={handleAddSchedule}>+ Agregar horario</button>
              </div>

              <div className="form-field">
                <label>Capacidad</label>
                <div className="input-wrapper capacity-wrapper">
                  <span className="capacity-icon material-symbols-outlined">accessibility_new</span>
                  <span className="capacity-number">{formData.capacity}</span>
                  <div className="capacity-buttons">
                    <button type="button" onClick={() => setFormData(f => ({ ...f, capacity: Math.max(1, f.capacity - 1) }))}>-</button>
                    <button type="button" onClick={() => setFormData(f => ({ ...f, capacity: f.capacity + 1 }))}>+</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-right">

              <div className="form-field">
                <label>Categoría</label>
                <div className="input-wrapper">
                  <input name="category" value={formData.category} onChange={handleChange} />
                </div>
              </div>

              <div className="form-field">
                <label>Descripción</label>
                <div className="input-wrapper">
                  <textarea name="description" value={formData.description} onChange={handleChange} />
                </div>
              </div>

              <div className="form-field">
                <label>Precio</label>
                <div className="input-wrapper">
                  <input name="price" type="number" value={formData.price} onChange={handleChange} />
                  <span className="price-suffix">/clase</span>
                </div>
              </div>

              <div className="form-field">
                <label>Modalidad</label>
                <div className="input-wrapper">
                  <select name="modality" value={formData.modality} onChange={handleChange}>
                    <option value="">Seleccionar</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Virtual">Virtual</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>Idioma</label>
                <div className="input-wrapper">
                  <input name="language" value={formData.language} onChange={handleChange} />
                </div>
              </div>

              <div className="form-field">
                <label>Ubicación</label>
                <div className="input-wrapper">
                  <input name="location" value={formData.location} onChange={handleChange} />
                </div>
              </div>
      
            </div>

          </div>

          <div className="form-field">
            <label>Link a los archivos adjuntos de la clase</label>
            <div className="input-wrapper">
              <input name="attachmentLink" value={formData.attachmentLink} onChange={handleChange} />
            </div>
          </div>

          <button className="submit-btn" type="submit">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
}