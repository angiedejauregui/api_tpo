import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ClassCard from "../../ClassCard/ClassCard";
import "./MyClasses.css";

export default function MyClasses() {
  const [myClasses, setMyClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchMyClasses = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/services/by-instructor?instructor=${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        setMyClasses(data);
      } catch (err) {
        setError("Error al cargar tus clases");
      } finally {
        setLoading(false);
      }
    };

    fetchMyClasses();
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
            <ClassCard key={classItem._id} data={classItem} />
          ))}
        </div>
      )}
    </section>
  );
}