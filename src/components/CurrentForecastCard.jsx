import React from 'react';
import { format } from 'date-fns';
import { cToF, mpsToKmh, mpsToMph } from '../utils/convert';

const CurrentForecastCard = ({ current, unit }) => {
  //Converts temp from C to F if needed
  const temp    = unit === 'metric'
    ?  current.temp
    :  cToF(current.temp);
  const feels   = unit === 'metric'
    ?  current.feels_like
    :  cToF(current.feels_like);

  //Converts wind speed from m/s to km/h or mph
  const wind    = unit === 'metric'
    ?  mpsToKmh(current.wind_speed)
    :  mpsToMph(current.wind_speed);

  return (
    <div className="flex justify-around bg-blue-50 shadow-md rounded-lg p-4 mb-4">
      <div className='m-2'>
        <h2 className="text-center text-xl font-bold">Current Weather</h2>
        {/* Populates image with custom image that matches API condition */}
        <img className='max-w-45 rounded-3xl p-3' src={`../${current.weather[0].icon}.png`} alt="icon" />
      </div>
      {/* Renders card with data pulled from API data to desired units and output */}
      <div className='self-center'>
        <p>{format(new Date(current.dt * 1000), 'eeee, MMM d, hh:mm a')}</p>
        <p>Temp: {Math.round(temp)}°{unit==='metric'?'C':'F'}</p>
        <p>Feels like: {Math.round(feels)}°{unit==='metric'?'C':'F'}</p>
        <p>Wind: {Math.round(wind)} {unit==='metric'?'km/h':'mph'}</p>
        <p>Sunrise: {format(new Date(current.sunrise * 1000), 'hh:mm a')}</p>
        <p>Sunset: {format(new Date(current.sunset * 1000), 'hh:mm a')}</p>
        <p>Weather: {current.weather[0].main} - {current.weather[0].description}</p>
      </div>
    </div>
  );
};

export default CurrentForecastCard;