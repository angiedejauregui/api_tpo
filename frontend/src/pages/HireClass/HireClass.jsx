import React, { useEffect, useState } from "react";
import ClassDetails from "../../components/HireClass/ClassDetails";
import ClassForm from "../../components/HireClass/ClassForm";
import { useParams } from "react-router-dom";
import "./HireClass.css";

const HireClass = () => {
  const [classData, setClassData] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/services/${id}`)
      .then((res) => res.json())
      .then((data) => setClassData(data))
      .catch((err) => console.error("Error al cargar clase:", err));
  }, [id]);

  if (!classData) return <p>Cargando...</p>;

  return (
    <div className="hire-class-container">
      <div className="hire-class-left">
        <ClassDetails
          image={classData.images}
          title={classData.category}
          modality={classData.modality}
          location={classData.location}
          instructor={classData.instructor}
          price={classData.price}
          selectedSlot={selectedSlot}
        />
      </div>
      <div className="hire-class-right">
        <ClassForm schedule={classData.schedule} onSelect={setSelectedSlot} />
      </div>
    </div>
  );
};

export default HireClass;
