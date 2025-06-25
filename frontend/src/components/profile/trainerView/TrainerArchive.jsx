import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TrainerClassCard from "./TrainerClassCard";
import "./TrainerClassCard.css";


export default function TrainerArchive() {
  const user = useSelector((state) => state.auth.user);
  const [archivedClasses, setArchivedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchArchivedClasses = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/services/by-instructor?instructor=${user.id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const data = await res.json();

        const filtered = data.filter(cls => cls.status === "unpublished");
        
        setArchivedClasses(filtered);
      } catch (err) {
        setError("Error al cargar las clases archivadas");
      } finally {
        setLoading(false);
      }
    };

    fetchArchivedClasses();
  }, [user]);

  if (loading) return <p>Cargando clases archivadas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="my-classes">
      <h2 className="archive-title">Archivo de Publicaciones</h2>
      {archivedClasses.length === 0 ? (
        <p>No tenés clases despublicadas.</p>
      ) : (
        <div className="class-grid">
          {archivedClasses.map((classItem) => (
            <TrainerClassCard 
                key={classItem._id}
                data={classItem}
                isArchiveView={true}
                onUpdate={(updatedClass) => {
                    if (updatedClass.deleted) {
                    setArchivedClasses((prev) =>
                        prev.filter((c) => c._id !== updatedClass._id)
                    );
                    } else {
                    setArchivedClasses((prev) =>
                        prev.map((c) => (c._id === updatedClass._id ? updatedClass : c))
                    );
                    }
                }}
            />
          ))}
        </div>
      )}
    </section>
  );
}