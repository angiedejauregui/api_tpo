import React, { useEffect, useState } from "react";
import ClassCard from "../../components/ClassCard/ClassCard";
import "./ClassGallery.css";

export default function ClassGallery() {
    const [classesData, setClassesData] = useState([]);

    useEffect(() => {
        fetch("/classesData.json")
            .then(response => response.json())
            .then(data => setClassesData(data))
            .catch(error => console.error("Error al cargar el JSON:", error));
    }, []);

    return (
        <section className="class-gallery">
            {classesData.map((classItem, index) => (
                <ClassCard key={index} data={classItem} />
            ))}
        </section>
    );
}
