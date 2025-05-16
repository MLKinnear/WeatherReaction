import React from 'react';

const LocationCard = ({ location, onSelect }) => {
  const { name, state, country, lat, lon } = location;

  return (
    //Renders Location Cards
    <div
      // When clicked gives the parent which lat/lon was picked
      onClick={() => onSelect(lat, lon)}
      className="text-center cursor-pointer p-4 m-2 bg-blue-50 rounded-lg shadow-md hover:bg-blue-100"
    >
      {/* Shows details from API data */}
      <h2 className="text-lg font-bold">{name}, {state}, {country}</h2>
      {/* Optional Lat and Lon details */}
      {/* <p>Lat: {lat}, Lon: {lon}</p> */}
    </div>
  );
};

export default LocationCard;