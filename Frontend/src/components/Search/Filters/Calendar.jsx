import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "../../App.css";

import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({showFilters}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  return (
    <div className={`vai-pra-esquerda ${showFilters ? "slide-out" : "slide-in"}`}>
      <label>
        De:
      <DatePicker
        className="filters-input-date"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="(Mês/Dia/Ano)"
        id="initialDate"
      />
      </label>
      <br />
      <label>
      Até:
      <DatePicker
        className="filters-input-date"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        placeholderText="(Mês/Dia/Ano)"
        id="finalDate"
      />
      </label>
    </div>
  );
};

export default Calendar;
