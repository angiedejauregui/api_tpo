import React, { useEffect, useState } from "react";
import ClassCard from "../../components/ClassCard/ClassCard";
import "./ClassGallery.css";

export default function ClassGallery() {
    const [classesData, setClassesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/services")
            .then((response) => {
                if (!response.ok) throw new Error("Error al cargar clases");
                return response.json();
            })
            .then((data) => {
                setClassesData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando clases...</p>;
    if (error) return <p>{error}</p>;

    return (
        <section className="class-gallery">
            {classesData.map((classItem, index) => (
                <ClassCard key={index} data={classItem} />
            ))}
        </section>
    );
}
