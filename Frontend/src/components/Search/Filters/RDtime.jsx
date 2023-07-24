import React from "react";
import "../../App.css";

export default function ReadingTimeFilter({ showFilters }) {
  return (
    <div
      className={`vai-pra-direita ${showFilters ? "slide-out" : "slide-in"}`}
    >
      <label>
        Tempo mínimo de leitura:
        <input className={`filters-input`} placeholder="int" type="text" id="minReadingTime" />,
        em minutos.
      </label>
      <br />
      <label>
        Tempo máximo de leitura:
        <input className={`filters-input`} placeholder="int" type="text" id="maxReadingTime" />,
        em minutos.
      </label>
    </div>
  );
}
