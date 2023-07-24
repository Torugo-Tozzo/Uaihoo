import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import DataOuTempo from "./Order";
import ReadingTimeFilter from "./RDtime";
import { format } from "date-fns";
import "../../App.css";

const Filters = ({ query, onFilterSubmit }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isDescendingOrder, setIsDescendingOrder] = useState(false);

  useEffect(() => {
    setShowFilters(false); // Oculta os filtros quando a query é alterada
  }, [query]);

  const toggleFilter = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleOrderChange = (event) => {
    setIsDescendingOrder(event.target.checked);
  };

  const handleFilterSubmit = () => {
    const queryParams = {
      filter: selectedFilter === "porData" ? "2" : "1",
    };

    const minReadingTime = document.getElementById("minReadingTime").value;
    const maxReadingTime = document.getElementById("maxReadingTime").value;
    const initialDate = document.getElementById("initialDate").value;
    const finalDate = document.getElementById("finalDate").value;

    if (minReadingTime) {
      queryParams.minReadingTime = minReadingTime;
    }

    if (maxReadingTime) {
      queryParams.maxReadingTime = maxReadingTime;
    }

    if (initialDate) {
      queryParams.initialDate = format(new Date(initialDate), "yyyy-MM-dd");
    }

    if (finalDate) {
      queryParams.finalDate = format(new Date(finalDate), "yyyy-MM-dd");
    }

    if (isDescendingOrder) {
      queryParams.order = "true";
    }

    onFilterSubmit(queryParams);
  };

  return (
    <div>
      <button className="filters-button" onClick={toggleFilter}>
        {showFilters ? "Ocultar Filtros" : "Filtros"}
      </button>
      <div
        className={`filters-container ${
          showFilters ? "slide-in" : "slide-out"
        }`}
      >
        {showFilters && (
          <div className="filters-form">
            <DataOuTempo handleFilterChange={handleFilterChange} />
            <div className="filters-row">
              <Calendar />
              <ReadingTimeFilter />
            </div>
            <label className="filters-label">
              <input
                type="checkbox"
                checked={isDescendingOrder}
                onChange={handleOrderChange}
                id="decrescente"
              />
              <span className="filters-checkbox-label">Ordem decrescente</span>
            </label>
            <button className="filters-button" onClick={handleFilterSubmit}>
              Filtrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
