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
                            <span class="material-symbols-outlined search-icon">search</span>
                            <input
                            type="text"
                            name="Search"
                            id="Search"
                            placeholder="Buscar"
                            className="search-input"
                            />
                            <span class="material-symbols-outlined filter-icon">filter_alt</span>
                        </div>
                    </fieldset>
                </form>
            </div>
        </section>
    );
}