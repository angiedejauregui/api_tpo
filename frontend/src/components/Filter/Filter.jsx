import React from "react";
import "./Filter.css";
import { FaStar } from "react-icons/fa6";


export default function Filter({
  isOpen,
  onClose,
  filters,
  setFilters,
  onApply,
}) {
  if (!isOpen) return null;

  const handleCheckbox = (key, value) => {
    setFilters((prev) => {
      const updated = prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value];
      return { ...prev, [key]: updated };
    });
  };

  const handleInput = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="filter-modal">
      <div className="filter-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <div className="filter-header">
          <h2>Filtros</h2>
          <button className="apply-btn" onClick={onApply}>
            APLICAR
          </button>
        </div>

        <section>
          <h3>Categoría</h3>
          {[
            "Funcional",
            "Spinning",
            "Pilates",
            "Yoga",
            "Running",
            "Gimnasio",
          ].map((cat) => (
            <label key={cat}>
              <input
                type="checkbox"
                checked={filters.category.includes(cat)}
                onChange={() => handleCheckbox("category", cat)}
              />
              {cat}
            </label>
          ))}
        </section>

        <div className="row">
          <div className="field">
            <h3>Duración</h3>
            <input type="number" placeholder="Mínimo" />
            <input type="number" placeholder="Máximo" />
          </div>

          <div className="field">
            <h3>Precio</h3>
            <input
              type="number"
              placeholder="Mínimo"
              value={filters.minPrice}
              onChange={(e) => handleInput("minPrice", e.target.value)}
            />
            <input
              type="number"
              placeholder="Máximo"
              value={filters.maxPrice}
              onChange={(e) => handleInput("maxPrice", e.target.value)}
            />
          </div>
        </div>

        <section>
          <h3>Zona</h3>
          {[
            "Palermo",
            "Núñez",
            "Monserrat",
            "Belgrano",
            "San Telmo",
            "Villa Urquiza",
          ].map((zone) => (
            <label key={zone}>
              <input
                type="checkbox"
                checked={filters.zone.includes(zone)}
                onChange={() => handleCheckbox("zone", zone)}
              />
              {zone}
            </label>
          ))}
        </section>

        <section>
          <h3>Idioma</h3>
          {["Español", "Inglés"].map((lang) => (
            <label key={lang}>
              <input
                type="checkbox"
                checked={filters.language.includes(lang)}
                onChange={() => handleCheckbox("language", lang)}
              />
              {lang}
            </label>
          ))}
        </section>

        <section>
          <h3>Modalidad</h3>
          {["Presencial", "Virtual"].map((mode) => (
            <label key={mode}>
              <input
                type="checkbox"
                checked={filters.modality.includes(mode)}
                onChange={() => handleCheckbox("modality", mode)}
              />
              {mode}
            </label>
          ))}
        </section>

        <section>
          <h3>Clasificación</h3>
          <div className="rating-row">
            <div>
            <span>Desde</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                onClick={() => handleInput("minRating", n)}
                className={n <= filters.minRating ? "star selected" : "star"}
              >
                <FaStar />
              </span>
            ))}
            </div>
            <div>
            <span>Hasta</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                onClick={() => handleInput("maxRating", n)}
                className={n <= filters.maxRating ? "star selected" : "star"}
              >
                <FaStar />
              </span>
            ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
