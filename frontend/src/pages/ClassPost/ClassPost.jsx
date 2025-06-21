import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ClassInfo from '../../components/ClassPost/ClassInfo';
import Schedule from '../../components/ClassPost/Schedule';
import './classPost.css';
import Opinions from '../../components/ClassPost/Opinions';
import axios from 'axios';

const ClassPost = () => {
  const { id } = useParams();
const [classData, setClassData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


  useEffect(() => {
       fetch(`http://localhost:5000/api/v1/services/${id}`)
            .then((response) => {
                if (!response.ok) throw new Error("Error al cargar clases");
                return response.json();
            })
            .then((data) => {
                setClassData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
            console.log(classData);
  }, [id]);

  if (!classData) return <p>Cargando...</p>;
  console.log(classData);

  return (
    <div className="class-detail">
      <div className="left-column-class-post">
        <h1>{classData.category}</h1>
        <div className="tags">
          <span className="tag">{classData.modality}</span>
          <span className="tag">{classData.location}</span>
        </div>
        <p>{classData.description}</p>
        <Schedule schedule={classData.schedule} />
        <Opinions rating={classData.rating} reviews={classData.reviews} />
      </div>
      <div className="right-column-class-post">
        <ClassInfo trainer={classData.instructor} price={classData.price} />
      </div>
    </div>
  )
}

export default ClassPost