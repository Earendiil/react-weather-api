import { useState, useEffect } from 'react';

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [debouncedTitle, setDebouncedTitle] = useState(city);
  const [favoriteCities, setFavoriteCities] = useState(["Leipzig", "Patras", "Innsbrück"]);
  const [favoriteWeather, setFavoriteWeather] = useState([]);
  const removeCity = (cityToRemove) => {
    setFavoriteCities(favoriteCities.filter(city => city !== cityToRemove));
  }
  // Debouncing the city input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTitle(city);  
    }, 500);
  
    return () => {
      clearTimeout(timer);  // Cleanup timeout city input changes
    };
  }, [city]);

  

  // Fetch weather data based on the city
  useEffect(() => {
    if (!debouncedTitle) return; 

    const fetchWeatherData = async (cityName) => {
      setLoading(true);
      const response = await fetch(`https://wttr.in/${cityName}?format=%C+%t+%h&m`);  
      const data = await response.text();
      
      const [condition, temperature, humidity] = data.split(" ");
      setWeather({
        condition: condition,
        temperature: temperature,
        humidity: humidity,
      });
      setLoading(false);
    };

    
    fetchWeatherData(debouncedTitle);
  }, [debouncedTitle]);

  // Fetch  data for the favorites only when the component mounts
  useEffect(() => {
    const fetchFavoriteCitiesWeather = async () => {
      const weatherData = [];
      for (const city of favoriteCities) {
        const response = await fetch(`https://wttr.in/${city}?format=%C+%t+%h&m`);
        const data = await response.text();
        
        const [condition, temperature, humidity] = data.split(" ");
        weatherData.push({
          city,
          condition,
          temperature,
          humidity,
        });
      }
      setFavoriteWeather(weatherData);
    };

    fetchFavoriteCitiesWeather();
  }, [favoriteCities]); 

  return (
    <div className='weather'>
    <div>
        
      <h1>Weather App ⛅</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => {
          const inputValue = e.target.value;
          // allow only letters and spaces as input
          if (/^[A-Za-z\s]*$/.test(inputValue)) { 
            setCity(inputValue);
          }
        }}
      />
              <button onClick={ () => {
               if (city !== null && city.trim() !=="") {
                setFavoriteCities([...favoriteCities, city])
               }}}
              >Add to favorites</button>

      <div className='weather-info'>
         {loading ? ( <p>Loading...</p>   ) : (
        <div>
          <h2>Weather in {city}</h2>
          <p>Condition: {weather.condition}</p>
          <p>Temperature: {weather.temperature}</p>
          <p>Humidity: {weather.humidity}</p>
        </div>
      )}
      </div>
      <h2>Favorite Cities</h2>
      <div className='favorites'>
        {favoriteWeather.map((cityData) => (
          <div key={cityData.city}>
            <h3>{cityData.city} <button onClick={() => removeCity(cityData.city)}>remove 
                  </button></h3>
            <p>Condition: {cityData.condition}</p>
            <p>Temperature: {cityData.temperature}</p>
            <p>Humidity: {cityData.humidity}</p>
          </div>
        ))}
        
      
        </div>
    </div>
    </div>
  );
}

export default Weather;
