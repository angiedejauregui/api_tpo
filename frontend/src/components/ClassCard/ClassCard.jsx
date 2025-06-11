import React from "react";
import './ClassCard.css';

export default function ClassCard({ data }) {
    return (
        <article className="class-card">
            <div className="class-card__images">
                {data.images.slice(0, 2).map((img, index) => (
                    <img key={index} src={img} alt={`Clase de ${data.instructorName}`} />
                ))}
                <span className="class-card__category">{data.category}</span>
            </div>

            <div className="class-card__info">
                <h3 className="class-card__name">{data.instructorName}</h3>
                <p className="class-card__rating">
                    ⭐ {data.rating} ({data.reviews} opiniones)
                </p>
                <p className="class-card__location">{data.location}</p>
                <p className="class-card__description">{data.description}</p>
                <p className="class-card__price">
                    ${data.price.toLocaleString("es-AR")},00/clase
                </p>
            </div>
        </article>
    );
}
