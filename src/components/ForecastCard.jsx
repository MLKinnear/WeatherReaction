import React from 'react';
import CurrentForecastCard from './CurrentForecastCard';
import HourlyCard from './HourlyCard';
import DailyCard from './DailyCard';

const ForecastCard = ({ forecast, unit }) => {
  // If no forecast data is available yet, render nothing
  if (!forecast) return null;

  // Presents the three main sections from the API response
  const { current, hourly, daily } = forecast;

  return (
    <div className="p-4">
      {/* Renders Current Weather Forecast */}
      <div className="flex justify-center">
      <CurrentForecastCard current={current} unit={unit}/>
      </div>
      {/* Renders Hourly Weather Forecast */}
      <h2 className="text-xl font-bold mt-4">Hourly Forecast</h2>
      <div className="flex overflow-x-auto">
        {hourly.slice(0, 12).map((hour, idx) => (
          <HourlyCard key={idx} hour={hour} unit={unit} />
        ))}
      </div>
      {/* Renders 7 Day Weather Forecast */}
      <h2 className="text-xl font-bold mt-4">7 Day Forecast</h2>
      <div className="flex overflow-x-auto">
        {daily.slice(0, 7).map((day, idx) => (
          <DailyCard key={idx} day={day} unit={unit} />
        ))}
      </div>
      
    </div>
  );
};

export default ForecastCard;