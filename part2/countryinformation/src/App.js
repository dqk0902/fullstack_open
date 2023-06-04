import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Search for a country"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <WeatherCard searchTerm={searchTerm} />
    </div>
  );
};

export default App;
