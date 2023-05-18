import React from "react";

const Filter = ({ filterValue, handleFilterChange }) => {
  return (
    <div>
      Filter shown with:{" "}
      <input value={filterValue} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
