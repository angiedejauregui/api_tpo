import React, { useEffect, useState } from "react";
import ClassCard from "../../components/ClassCard/ClassCard";
import Filter from "../../components/Filter/Filter";
import "./ClassGallery.css";

export default function ClassGallery({
  showModal,
  setShowModal,
  filters,
  setFilters,
  appliedFilters,
  setAppliedFilters
}) {
  const [classesData, setClassesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFilteredClasses = (customFilters = appliedFilters) => {
    const params = new URLSearchParams();

    if (customFilters.category.length) params.append("category", customFilters.category.join(","));
    if (customFilters.zone.length) params.append("zone", customFilters.zone.join(","));
    if (customFilters.language.length) params.append("language", customFilters.language.join(","));
    if (customFilters.mode.length) params.append("mode", customFilters.mode.join(","));
    if (customFilters.minPrice) params.append("minPrice", customFilters.minPrice);
    if (customFilters.maxPrice) params.append("maxPrice", customFilters.maxPrice);
    if (customFilters.minRating) params.append("minRating", customFilters.minRating);
    if (customFilters.maxRating) params.append("maxRating", customFilters.maxRating);

    fetch(`http://localhost:5000/api/v1/services?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setClassesData(data))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/services")
      .then((res) => res.json())
      .then((data) => {
        setClassesData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchFilteredClasses();
  }, [appliedFilters]);

  if (loading) return <p>Cargando clases...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="class-gallery">
      <Filter
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        filters={filters}
        setFilters={setFilters}
        onApply={() => {
          setAppliedFilters(filters); 
          setShowModal(false);
        }}
      />
      {classesData.map((classItem, index) => (
        <ClassCard key={index} data={classItem} />
      ))}
    </section>
  );
}

