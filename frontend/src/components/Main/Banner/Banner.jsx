import React, { useState } from "react";
import "./Banner.css";

export default function Banner({
  filters,
  clearFilter,
  onOpenFilter,
  onSearch,
}) {
  const renderTags = () => {
    const tags = [];

    const addTags = (key, labelFormatter = (v) => v) => {
      if (Array.isArray(filters[key])) {
        filters[key].forEach((val) =>
          tags.push({ label: labelFormatter(val), key, value: val })
        );
      } else if (filters[key]) {
        tags.push({
          label: labelFormatter(filters[key]),
          key,
          value: filters[key],
        });
      }
    };

    addTags("category");
    addTags("zone");
    addTags("language");
    addTags("mode");
    addTags("minPrice", (v) => `Precio desde $${v}`);
    addTags("maxPrice", (v) => `Precio hasta $${v}`);
    addTags("minRating", (v) => `⭐ desde ${v}`);
    addTags("maxRating", (v) => `⭐ hasta ${v}`);

    if (tags.length === 0) return null;

    return (
      <div className="filter-tags">
        {tags.map((tag, i) => (
          <span key={i} className="filter-tag">
            <button onClick={() => clearFilter(tag.key, tag.value)}>×</button>
            {tag.label}
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="banner">
      <img
        src="/pesasGym.png"
        alt="Banner pesas de gimnasio"
        className="banner-img"
      />
      <div className="banner-overlay"></div>
      <div className="banner-content">
        <form className="search-form">
          <fieldset>
            <div className="search-container">
              <span className="material-symbols-outlined search-icon">
                search
              </span>
              <input
                type="text"
                name="Search"
                id="Search"
                placeholder="Buscar"
                className="search-input"
                onChange={(e) => onSearch(e.target.value)}
              />
              <span
                className="material-symbols-outlined filter-icon"
                onClick={onOpenFilter}
              >
                filter_alt
              </span>
            </div>
          </fieldset>
        </form>
        {renderTags()}
      </div>
    </section>
  );
}
