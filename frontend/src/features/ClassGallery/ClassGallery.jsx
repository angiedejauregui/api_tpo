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
  setAppliedFilters,
  searchText,
}) {
  const [classesData, setClassesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFilteredClasses = async (customFilters = appliedFilters) => {
    try {
      const params = new URLSearchParams();

      if (customFilters.category?.length)
        params.append("category", customFilters.category.join(","));
      if (customFilters.location?.length)
        params.append("zone", customFilters.zone.join(","));
      if (customFilters.zone?.length)
        params.append("language", customFilters.language.join(","));
      if (customFilters.modality?.length)
        params.append("modality", customFilters.modality.join(","));
      if (customFilters.minPrice)
        params.append("minPrice", customFilters.minPrice);
      if (customFilters.maxPrice)
        params.append("maxPrice", customFilters.maxPrice);
      if (customFilters.minRating)
        params.append("minRating", customFilters.minRating);
      if (customFilters.maxRating)
        params.append("maxRating", customFilters.maxRating);

      const res = await fetch(`http://localhost:5000/api/v1/services?${params.toString()}`);
      const data = await res.json();
      setClassesData(data);
    } catch (err) {
      setError(err.message);
    }
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

  const filteredClasses = classesData.filter((item) => {
    if (!searchText) return true;
    const text = searchText.toLowerCase();
    return (
      item.category?.toLowerCase().includes(text) ||
      item.description?.toLowerCase().includes(text) ||
      item.instructor?.name?.toLowerCase().includes(text) ||
      item.instructor?.lastName?.toLowerCase().includes(text) ||
      item.location?.toLowerCase().includes(text) ||
      item.modality?.toLowerCase().includes(text) ||
      item.language?.toLowerCase().includes(text)
    );
  });

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
      {filteredClasses.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        filteredClasses.map((classItem, index) => (
          <ClassCard key={index} data={classItem} />
        ))
      )}
    </section>
  );
}
