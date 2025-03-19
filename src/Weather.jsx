import { useState, useEffect } from 'react';

function Weather() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch weather data based on the city
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      const response = await fetch(`https://wttr.in/${city}?format=%C+%t+%h`);
      const data = await response.text();
      
      const [condition, temperature, humidity] = data.split(" ");
      setWeather({
        condition: condition,
        temperature: temperature,
        humidity: humidity,
      });
      setLoading(false);
    };

    fetchWeatherData();
  }, [city]);

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Weather in {city}</h2>
          <p>Condition: {weather.condition}</p>
          <p>Temperature: {weather.temperature}</p>
          <p>Humidity: {weather.humidity}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
