import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '/picture/search.png'; 
import clear_icon from '/picture/clear.png'; 
import cloud_icon from '/picture/cloud.png'; 
import drizzle_icon from '/picture/drizzle.png'; 
import humidity_icon from '/picture/humidity.png';
import rain_icon from '/picture/rain.png'; 
import snow_icon from '/picture/snow.png';
import wind_icon from '/picture/wind.png';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon
  };
  
  const search = async (city) => {
    if (city === "") {
      alert("Enter the City Name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_KEY}`;
      const response = await fetch(url);

      if (response.status === 404) {
        setWeatherData(null);
        setError("No Data Found this City or Wrong Your City Name.");
        return;
      }

      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      });
      setError("");
    } catch (error) {
      setWeatherData(null);
      setError("Error fetching weather data.");
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("New York");
  }, []);

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={search_icon} alt="search" onClick={() => search(inputRef.current.value)} />
      </div>

      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}°c</p>
          <p className='location'>{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className='error-message'>{error}</p>
      )}
    </div>
  );
}

export default Weather;











/**
 import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '/picture/search.png'; 
import clear_icon from '/picture/clear.png'; 
import cloud_icon from '/picture/cloud.png'; 
import drizzle_icon from '/picture/drizzle.png'; 
import  humidity_icon from '/picture/humidity.png';
import rain_icon from '/picture/rain.png'; 
import snow_icon from '/picture/snow.png';
import wind_icon from '/picture/wind.png';

const Weather = () => {

  const inputRef = useRef();
   const [weatherData, setWeatherData]= useState(false);

   const allIcons ={
    "01d": clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon
   }
    

  const search= async (city)=>{
      if(city === ""){
        alert("Enter The City Name");
        return;
      }

    try{
      const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon= allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon

      })
    } catch(error){
      setWeatherData(false);
      console.error("Error in fatching weather data");

    }
  }
 
 useEffect (()=>{
  search("New York");
 }, [])

 
  return (
    <div className='weather'>
     <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={search_icon} alt="image" onClick={()=>search(inputRef.current.value)} />
        
     </div>
     
     { weatherData? <> 
     
      <img src={weatherData.icon} alt="" className='weather-icon' />
     <p className='temperature'>{weatherData.temperature}°c</p>
     <p className='location'>{weatherData.location}</p>
      
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
     
     </> :<> <p className='error-mass'>API KEY NOT WORKING -EROOR 404</p> </>

     }

    


    </div>
  )
}

export default Weather

 */