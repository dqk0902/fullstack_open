import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherCard.css";
const { REACT_APP_API_KEY } = process.env;

const WeatherCard = ({ searchTerm }) => {
  const [countries, setCountries] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    const fetchCountrySearch = async () => {
      if (searchTerm) {
        try {
          const response = await axios.get(
            `https://restcountries.com/v2/name/${searchTerm}`
          );
          setCountries(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    setShowDetails(true);
    fetchCountrySearch();
  }, [searchTerm]);

  useEffect(() => {
    if (countries.length > 0) {
      setSelectedCountry(countries[0]);
      fetchWeatherData(countries[0].capital);
    } else {
      setSelectedCountry(null);
      setWeatherData(null);
    }
  }, [countries]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    fetchWeatherData(country.capital);
    setShowDetails(false);
  };

  const fetchWeatherData = (city) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${REACT_APP_API_KEY}`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {countries.length > 0 ? (
        countries.length > 10 ? (
          <p>
            Too many countries match the search criteria. Please specify your
            search.
          </p>
        ) : showDetails ? (
          countries.map((country) => (
            <div key={country.alpha2Code}>
              <p>{country.name}</p>
              <button onClick={() => handleCountrySelect(country)}>
                Show Details
              </button>
            </div>
          ))
        ) : (
          <div>
            <div>
              <h2>{selectedCountry.name}</h2>
              <p>Capital: {selectedCountry.capital}</p>
              <p>Population: {selectedCountry.population}</p>
              <img
                src={selectedCountry.flag}
                alt="Flag"
                className="flag-image"
              />
              <h3>Languages:</h3>
              <ul>
                {selectedCountry.languages.map((language) => (
                  <li key={language.iso639_1}>{language.name}</li>
                ))}
              </ul>
              {weatherData ? (
                <div>
                  <h3>Weather in {weatherData.name}</h3>
                  <p>
                    Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C
                  </p>
                  <div>
                    {" "}
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                      style={{ height: "100px", width: "100px" }}
                      alt="img"
                    />
                  </div>
                  <div>
                    {" "}
                    <strong>wind: </strong>
                    {weatherData.wind.speed} mph{" "}
                  </div>
                </div>
              ) : (
                <p>Loading weather data...</p>
              )}
            </div>
          </div>
        )
      ) : (
        <p>No countries found with the search criteria.</p>
      )}
    </div>
  );
};

export default WeatherCard;
