import React, { useState } from "react";
import Banner from "./Banner/Banner";
import ClassGallery from "../../features/ClassGallery/ClassGallery";

export default function Main() {
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [filters, setFilters] = useState({
    category: [],
    zone: [],
    language: [],
    modality: [],
    minPrice: "",
    maxPrice: "",
    minRating: "",
    maxRating: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({ ...filters });

  const clearFilter = (key, value) => {
  setAppliedFilters((prev) => {
    if (Array.isArray(prev[key])) {
      return { ...prev, [key]: prev[key].filter((v) => v !== value) };
    } else {
      return { ...prev, [key]: "" };
    }
  });

  setFilters((prev) => {
    if (Array.isArray(prev[key])) {
      return { ...prev, [key]: prev[key].filter((v) => v !== value) };
    } else {
      return { ...prev, [key]: "" };
    }
  });
};


  return (
    <>
      <Banner
        onOpenFilter={() => setShowModal(true)}
        clearFilter={clearFilter}
        filters={appliedFilters}
        onSearch={setSearchText}
      />
      <ClassGallery
        showModal={showModal}
        setShowModal={setShowModal}
        filters={filters}
        setFilters={setFilters}
        appliedFilters={appliedFilters}
        setAppliedFilters={setAppliedFilters}
        searchText={searchText}
      />
    </>
  );
}
