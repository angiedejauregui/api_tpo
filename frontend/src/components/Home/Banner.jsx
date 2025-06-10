import React from "react";
import './Banner.css';

export default function Banner () {
    return(
        <section className="banner">
            <img src="/pesasGym.png" alt="Banner pesas de gimnasio" className="banner-img"/>
            <div className="banner-overlay"></div>
            <div className="banner-content">
                <form className="search-form" action="" method="get">
                    <fieldset>
                        <div className="search-container">
                            <span className="search-icon">🔍</span>
                            <input
                            type="text"
                            name="Search"
                            id="Search"
                            placeholder="Buscar"
                            />
                            <span className="filter-icon">⚙️</span>
                        </div>
                    </fieldset>
                </form>
            </div>
        </section>
    );
}