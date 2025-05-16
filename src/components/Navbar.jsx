import React, { useState } from 'react';

const Navbar = ({ onSearch, unit, onToggleUnit }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
    setCity('');
  };

  return (
    //Handles search input and state
    <form onSubmit={handleSubmit} className="flex items-center justify-center my-4 space-x-2">
      <input
        id="city-search"
        name="city"
        type="text"
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Search a location..."
        autoComplete="off"
        className="bg-blue-50 border p-2 rounded-md"
      />
      {/* Search button */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Search
      </button>

      {/* pill toggle for C to F */}
      <button
        type="button"
        onClick={onToggleUnit}
        className="relative inline-flex items-center bg-gray-200 rounded-full p-1"
      >
        {/* Sliding color */}
        <span
          className={`
            absolute left-0 top-0
            h-7 w-9
            bg-blue-500 rounded-full
            transition-transform duration-200
            ${unit === 'imperial' ? 'translate-x-8' : 'translate-x-0'}
          `}
        />
        {/* Units */}
        <span className="relative z-10 w-8 text-center text-sm font-medium">
          °C
        </span>
        <span className="relative z-10 w-7 text-center text-sm font-medium">
          °F
        </span>
      </button>
    </form>
  );
};

export default Navbar;