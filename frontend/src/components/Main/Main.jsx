import React, { useState } from "react";
import Banner from "./Banner/Banner";
import ClassGallery from "../../features/ClassGallery/ClassGallery";

export default function Main() {
  const [showModal, setShowModal] = useState(false);

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

  const [appliedFilters, setAppliedFilters] = useState({ ...filters });

  const clearFilter = (key, value) => {
    const updated = {
      ...appliedFilters,
      [key]: Array.isArray(appliedFilters[key])
        ? appliedFilters[key].filter((v) => v !== value)
        : ""
    };

    setAppliedFilters(updated);
  };

  return (
    <>
      <Banner
        onOpenFilter={() => setShowModal(true)}
        clearFilter={clearFilter}
        filters={appliedFilters}
      />
      <ClassGallery
        showModal={showModal}
        setShowModal={setShowModal}
        filters={filters}
        setFilters={setFilters}
        appliedFilters={appliedFilters}
        setAppliedFilters={setAppliedFilters}
      />
    </>
  );
}
