import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TrainerClassCard from "./TrainerClassCard";
import "./MyClasses.css";
import { fetchClassesByInstructor } from "../../../features/updateClases";

export default function MyClasses() {
  const [myClasses, setMyClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    const loadClasses = async () => {
      try {
        const data = await fetchClassesByInstructor(userId, user.token);
        setMyClasses(data);
      } catch (err) {
        setError("Error al cargar tus clases");
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
  }, [userId]);

  if (loading) return <p>Cargando tus clases...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="my-classes">
      {myClasses.length === 0 ? (
        <p>No tenés clases publicadas todavía.</p>
      ) : (
        <div className="class-grid">
          {myClasses.map((classItem) => (
            <TrainerClassCard 
              key={classItem._id} 
              data={classItem} 
              onUpdate={(updatedClass) => {
                setMyClasses((prev) =>
                  prev.map((cls) => (cls._id === updatedClass._id ? updatedClass : cls))
                );
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}