import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./NewClass.css";

export default function NewClass({ onClose }) {
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    instructor: "",
    category: "",
    description: "",
    price: "",
    modality: "",
    language: "",
    location: "",
    capacity: 1,
    attachmentLink: "",
    schedule: [],
    day: "",
    from: "",
    to: "",
    image: []
  });

  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef();

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const requiredFields = ["category", "description", "price", "modality", "language", "location"];
    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = true;
    });

    const validSchedule = formData.schedule.filter(s => s.day && s.from && s.to && (s.from < s.to));
      if (validSchedule.length === 0) {
        newErrors.schedule = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleScheduleChange = (index, field, value) => {
        const newSchedule = [...formData.schedule];
        newSchedule[index][field] = value;
        setFormData(prev => ({ ...prev, schedule: newSchedule }));
    };

    const handleAddSchedule = () => {
        setFormData(prev => ({
            ...prev,
            schedule: [...prev.schedule, { day: "", from: "", to: "" }],
        }));
    };

    const handleRemoveSchedule = (index) => {
        const newSchedule = [...formData.schedule];
        newSchedule.splice(index, 1);
        setFormData(prev => ({ ...prev, schedule: newSchedule }));
    };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const form = new FormData();

    form.append("instructor", user.id);
    form.append("category", formData.category);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("modality", formData.modality);
    form.append("language", formData.language);
    form.append("location", formData.location);
    form.append("capacity", formData.capacity);
    form.append("attachmentLink", formData.attachmentLink);
    form.append("schedule", JSON.stringify(formData.schedule));

    if (imageFile) {
      form.append("images", imageFile); 
    }

    try {
      await fetch("http://localhost:5000/api/v1/services", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: form
      });
      onClose();
    } catch (err) {
      alert("Error al publicar clase");
    }
  };

  return (
    <div className="new-class-overlay">
      <div className="new-class-modal">
        <h2>Nueva Publicación</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
        <form onSubmit={handleSubmit}>
          <div className="form-columns">
          
            <div className="form-left">

              <div className="form-field">
                <div className="input-wrapper image-box" onClick={() => fileInputRef.current.click()}>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                  {imageFile ? (
                    <img src={URL.createObjectURL(imageFile)} alt="Previsualización" />
                  ) : (
                    <span className="material-symbols-outlined image-icon">add_photo_alternate</span>
                  )}
                </div>
              </div>

              <div className="form-field">
                <label>
                  Disponibilidad Horaria
                  {errors.category && <span className="error-star">*</span>}
                </label>
                {formData.schedule.map((item, index) => (
                    <div key={index} className="input-wrapper schedule-row">
                    <select
                        name={`day-${index}`}
                        value={item.day}
                        onChange={(e) => handleScheduleChange(index, "day", e.target.value)}
                    >
                        <option value="" >Día</option>
                        {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((d) => (
                        <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                    <input
                        type="time"
                        value={item.from}
                        onChange={(e) => handleScheduleChange(index, "from", e.target.value)}
                    />
                    <input
                        type="time"
                        value={item.to}
                        onChange={(e) => handleScheduleChange(index, "to", e.target.value)}
                    />
                    <button type="button" onClick={() => handleRemoveSchedule(index)}>✕</button>
                    </div>
                ))}
                <button className="add-btn" type="button" onClick={handleAddSchedule}>+ Agregar horario</button>
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
                  <label>
                    Categoría
                    {errors.category && <span className="error-star">*</span>}
                  </label>
                  <div className="input-wrapper">
                  <input name="category" value={formData.category} onChange={handleChange} />
                  </div>
              </div>

              <div className="form-field">
                  <label>
                    Descripción
                    {errors.category && <span className="error-star">*</span>}
                  </label>
                  <div className="input-wrapper">
                  <textarea name="description" value={formData.description} onChange={handleChange} />
                  </div>
              </div>

              <div className="form-field">
                  <label>
                    Precio
                    {errors.category && <span className="error-star">*</span>}
                  </label>
                  <div className="input-wrapper">
                  <input 
                    name="price" 
                    type="number" 
                    value={formData.price} 
                    onChange={handleChange}
                    
                  />
                    <span className="price-suffix">/clase</span>
                  </div>
              </div>

              <div className="form-field">
                  <label>
                    Modalidad
                    {errors.category && <span className="error-star">*</span>}
                  </label>
                  <div className="input-wrapper">
                  <select name="modality" value={formData.modality} onChange={handleChange}>
                      <option value="">Seleccionar</option>
                      <option value="Presencial">Presencial</option>
                      <option value="Virtual">Virtual</option>
                  </select>
                  </div>
              </div>

              <div className="form-field">
                  <label>
                    Idioma
                    {errors.category && <span className="error-star">*</span>}
                  </label>
                  <div className="input-wrapper">
                  <input name="language" value={formData.language} onChange={handleChange} />
                  </div>
              </div>

              <div className="form-field">
                  <label>
                    Ubicación
                    {errors.category && <span className="error-star">*</span>}
                  </label>
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
          
          {Object.keys(errors).length > 0 && (
            <p className="form-error">Por favor completá los campos obligatorios marcados con *</p>
          )}

          <button className="publish-btn" type="submit" onChange={handleSubmit}>Publicar</button>
        </form>
      </div>
    </div>
  );
}
