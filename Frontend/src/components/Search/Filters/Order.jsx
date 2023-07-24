import React from "react";

export default function DataOuTempo({ handleFilterChange }) {
  return (
    <form>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: "10px" }}>
          <input
            type="radio"
            name="filtro1"
            value="porData"
            onChange={handleFilterChange}
          />
          Ordenação por Data.
        </label>
        <label>
          <input
            type="radio"
            name="filtro1"
            value="porRDtime"
            onChange={handleFilterChange}
          />
          Ordenação por tempo de leitura.
        </label>
      </div>
    </form>
  );
}

