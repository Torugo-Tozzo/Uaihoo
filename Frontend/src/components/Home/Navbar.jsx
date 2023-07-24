import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    // Função para buscar as informações climáticas de alfenas-MG
    const fetchWeatherInfo = async () => {
      try {
        const apiKey = 'some-key'; //use um dotenv aqui
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=-21.42&lon=-45.94&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        setWeatherInfo({
          location: data.name,
          temperature: data.main.temp,
          condition: data.weather[0].icon
        });
      } catch (error) {
        console.error('Erro ao buscar informações climáticas:', error);
      }
    };

    fetchWeatherInfo();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/"><img src="/Uaihoo.png" alt="Logo" /></a>
      </div>
      <div className="navbar-weather">
        {weatherInfo ? (
          <>
            <div>
            <img src={`https://openweathermap.org/img/w/${weatherInfo.condition}.png`} alt="Weather Icon" />
            <p>{weatherInfo.location}</p>
            </div>
            <p>{Math.floor(weatherInfo.temperature)}°C</p>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
