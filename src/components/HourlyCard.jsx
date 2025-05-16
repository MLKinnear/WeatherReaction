import React from 'react';
import { format } from 'date-fns';
import { cToF, mpsToKmh, mpsToMph } from '../utils/convert';

const HourlyCard = ({ hour, unit }) => {
  //Converts temp from C to F if needed
  const temp    = unit === 'metric'
    ?  hour.temp
    :  cToF(hour.temp);
  const feels   = unit === 'metric'
    ?  hour.feels_like
    :  cToF(hour.feels_like);
  //Converts wind speed from m/s to km/h or mph
  const wind    = unit === 'metric'
    ?  mpsToKmh(hour.wind_speed)
    :  mpsToMph(hour.wind_speed);

  return (
    <div className="bg-blue-50 shadow-md rounded-lg p-2 m-2 min-w-[150px] text-center">
      <p>{format(new Date(hour.dt * 1000), 'hh a')}</p>
      {/* Populates image with custom image that matches API condition */}
      <img className='rounded-3xl p-2' src={`../${hour.weather[0].icon}.png`} alt="icon" />
      {/* Renders card with data pulled from API data to desired units and output */}
      <p>{Math.round(temp)}°{unit==='metric'?'C':'F'}</p>
      <p>Feels: {Math.round(feels)}°{unit==='metric'?'C':'F'}</p>
      <p>Wind: {Math.round(wind)} {unit==='metric'?'km/h':'mph'}</p>
    </div>
  );
};

export default HourlyCard;