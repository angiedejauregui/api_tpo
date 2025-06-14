import React, { useState } from "react";
import Banner from "./Banner/Banner";
import ClassGallery from "../../features/ClassGallery/ClassGallery";

export default function Main() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Banner onOpenFilter={() => setShowModal(true)} />
      <ClassGallery showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}