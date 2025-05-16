import React, { useState, useMemo } from 'react';
import { useGeocoding } from './hooks/useGeocoding';
import { useForecast   } from './hooks/useForecast';
import Header   from './components/Header';
import Navbar   from './components/Navbar';
import LocationCard   from './components/LocationCard';
import ForecastCard   from './components/ForecastCard';
import Footer   from './components/Footer';

const App = () => {

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const [unit, setUnit] = useState('metric');
  // The location the user has selected null until they pick one
  const [selectedLoc, setSelectedLoc] = useState(null);

  // Geocoding hook: handles searching by city name
  const {
    results: geoResults,
    search:  handleSearch,
    loading: geoLoading,
    error:   geoError
  } = useGeocoding(apiKey);

  // Forecast hook: fetches weather for the selected location
  const { 
    data: forecastData,
    loading: forecastLoading,
    error: forecastError
  } = useForecast(selectedLoc, apiKey);
  // Decide which LocationCards to render
  // if none selected, show all geoResults
  // otherwise only show the one they’ve picked
  const cardsToShow = useMemo(() => {
    if (!selectedLoc) return geoResults;
    return geoResults.filter(l => l.lat === selectedLoc.lat && l.lon === selectedLoc.lon);
  }, [geoResults, selectedLoc]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Renders logo */}
      <Header />
      {/* Renders Navbar: search form with unit toggle */}
      <Navbar 
      onSearch={(city) => {
        // New search resets selection and forecast
        setSelectedLoc(null);
        handleSearch(city);
      }}
      unit={unit}
      onToggleUnit={() => setUnit(u => u === 'metric' ? 'imperial' : 'metric')}
      />

      {/* displays an alert banner if geocoding error present */}
      {geoError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mx-4 my-2">
          {geoError.message}
        </div>
      )}

      {/* displays a loading message */}
      {geoLoading && ( <p className="px-4 text-gray-600">Searching for locations…</p>)}

      {/* Renders results list */}
      <div className="px-4">
        {cardsToShow.map(loc => (
          <LocationCard
            key={`${loc.lat}-${loc.lon}`}
            location={loc}
            onSelect={() => {
              // stops fetching same loc multiple times
              if (selectedLoc?.lat === loc.lat && selectedLoc?.lon === loc.lon) return;
              setSelectedLoc(loc);
            }}
          />
        ))}
      </div>
      {/* displays an alert banner if forecast error present */}
      {forecastError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mx-4 my-2">
          {forecastError.message}
        </div>
      )}
      {/* displays a loading message */}
      {forecastLoading && (
        <p className="px-4 text-gray-600">Loading forecast…</p>
      )}
      {/*Renders Weather (current/hourly/daily) */}
      <ForecastCard forecast={forecastData} unit={unit} />
      {/* Renders bottom links */}
      <Footer />
    </div>
  );
};

export default App;