import React from 'react';
import { format } from 'date-fns';
import { cToF, mpsToKmh, mpsToMph } from '../utils/convert';

const DailyCard = ({ day, unit }) => {
  //Converts temp from C to F if needed
  const dayTemp = unit === 'metric'
    ? day.temp.day
    : cToF(day.temp.day);
  const minTemp = unit === 'metric'
    ? day.temp.min
    : cToF(day.temp.min);
  const maxTemp = unit === 'metric'
    ? day.temp.max
    : cToF(day.temp.max);
  //Converts wind speed from m/s to km/h or mph
  const windSpeed = unit === 'metric'
    ?  mpsToKmh(day.wind_speed)
    :  mpsToMph(day.wind_speed);
  //Reducing repeating of code
  const tempUnit = unit === 'metric' ? 'C' : 'F';
  const windUnit = unit === 'metric' ? 'km/h' : 'mph';

  return (
    <div className="bg-blue-50 shadow-md rounded-lg p-2 m-2 min-w-[200px] text-center">
      <p className='text-center text-lg'>{format(new Date(day.dt * 1000), 'eeee')}</p>
      <p>{format(new Date(day.dt * 1000), 'MMM d')}</p>
      <div className='flex justify-center'>
        {/* Populates image with custom image that matches API condition */}
        <img className='max-w-35 rounded-3xl p-2' src={`../${day.weather[0].icon}.png`} alt="icon" />
      </div>
      {/* Renders card with data pulled from API data to desired units and output */}
      <p>Day: {Math.round(dayTemp)}°{tempUnit}</p>
      <p>Min: {Math.round(minTemp)}°{tempUnit}</p>
      <p>Max: {Math.round(maxTemp)}°{tempUnit}</p>
      <p>Wind: {Math.round(windSpeed)} {windUnit}</p>
      <p>Sunrise: {format(new Date(day.sunrise * 1000), 'hh:mm a')}</p>
      <p>Sunset: {format(new Date(day.sunset * 1000), 'hh:mm a')}</p>
      <p>{day.weather[0].main} - {day.weather[0].description}</p>
    </div>
  );
};

export default DailyCard;