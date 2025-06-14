import React, { useEffect, useState } from "react";
import ClassCard from "../../components/ClassCard/ClassCard";
import Filter from "../../components/Filter/Filter";
import "./ClassGallery.css";

export default function ClassGallery({ showModal, setShowModal }) {
  const [classesData, setClassesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    category: [],
    zone: [],
    language: [],
    mode: [],
    minPrice: "",
    maxPrice: "",
    minRating: "",
    maxRating: ""
  });

const fetchFilteredClasses = () => {
  const params = new URLSearchParams();

  if (filters.category.length) params.append("category", filters.category.join(","));
  if (filters.zone.length) params.append("zone", filters.zone.join(","));
  if (filters.language.length) params.append("language", filters.language.join(","));
  if (filters.mode.length) params.append("mode", filters.mode.join(","));
  if (filters.minPrice) params.append("minPrice", filters.minPrice);
  if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
  if (filters.minRating) params.append("minRating", filters.minRating);
  if (filters.maxRating) params.append("maxRating", filters.maxRating);

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
          fetchFilteredClasses();
          setShowModal(false);
        }}
      />

      {classesData.map((classItem, index) => (
        <ClassCard key={index} data={classItem} />
      ))}
    </section>
  );
}
