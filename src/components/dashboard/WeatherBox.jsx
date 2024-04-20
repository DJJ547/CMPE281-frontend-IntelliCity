import React, { useState, useEffect } from "react";

export default function WeatherBox(props) {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "872cf2a902a7e1d928e849636f00470f";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${props.latState}&lon=${props.lngState}&appid=${API_KEY}`;

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        if(data.weather[0].main === 'Thunderstorm') {
            data['weather_img_str'] = 'thunderstorm';
        }else if(data.weather[0].main === 'Drizzle') {
            data['weather_img_str'] = 'weather_mix';
        }else if(data.weather[0].main === 'Rain') {
            data['weather_img_str'] = 'rainy';
        }else if(data.weather[0].main === 'Snow') {
            data['weather_img_str'] = 'cloudy_snowing';
        }else if(data.weather[0].main === 'Clear') {
            data['weather_img_str'] = 'sunny';
        }else if(data.weather[0].main === 'Clouds') {
            data['weather_img_str'] = 'cloud';
        }else if(data.weather[0].main === 'Squall') {
            data['weather_img_str'] = 'air';
        }else if(data.weather[0].main === 'Tornado') {
            data['weather_img_str'] = 'tornado';
        }else if(data.weather[0].main === 'Mist' || data.weather[0].main === 'Fog' || data.weather[0].main === 'Haze' || data.weather[0].main === 'Smoke' || data.weather[0].main === 'Dust' || data.weather[0].main === 'Sand' || data.weather[0].main === 'Ash') {
            data['weather_img_str'] = 'foggy';
        }
        setWeatherData(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [API_URL, props.latState, props.lngState]);

  if (!weatherData) {
    return <div>Click on a Marker to See Weather Info</div>;
  }

  return (
    <div className="w-full h-32 p-2 bg-white rounded-lg shadow-xl shadow-blue-gray-900">
      <h2 className="text-lg font-bold mb-2">
        Current Weather in <span className="text-blue-600">{weatherData.name}</span>
      </h2>
      <div className="flex justify-between">
        <p className="text-gray-700">
          <span className="material-symbols-outlined text-md">{weatherData.weather_img_str}</span>
          {weatherData.weather[0].main}
        </p>
        {weatherData.rain && <p className="text-gray-600">Rain Vol: {weatherData.rain['1h']}mm/h</p>}
        {weatherData.snow && <p className="text-gray-600">Snow Vol: {weatherData.rain['1h']}mm/h</p>}
        <p className="text-gray-600">Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
      </div>
      <div className="flex justify-between">
      <p className="text-gray-600">Humidity: {weatherData.main.humidity}%</p>
      <p className="text-gray-600">Visibility: {weatherData.visibility}m</p>
      </div>
      <div className="flex justify-between">
      <p className="text-gray-600">Wind Speed: {weatherData.wind.speed}m/s, </p>
      <p className="text-gray-600">Degree: {weatherData.wind.deg}, </p>
      <p className="text-gray-600">Gust: {weatherData.wind.gust}m/s, </p>
      </div>
    </div>
  );
}
