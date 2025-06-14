import React from "react";
import './Banner.css';

export default function Banner({ onOpenFilter }) {
  return (
    <section className="banner">
      <img src="/pesasGym.png" alt="Banner pesas de gimnasio" className="banner-img" />
      <div className="banner-overlay"></div>
      <div className="banner-content">
        <form className="search-form">
          <fieldset>
            <div className="search-container">
              <span className="material-symbols-outlined search-icon">search</span>
              <input
                type="text"
                placeholder="Buscar"
                className="search-input"
              />
              <span
                className="material-symbols-outlined filter-icon"
                onClick={onOpenFilter}
                style={{ cursor: "pointer" }}
              >
                filter_alt
              </span>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}
