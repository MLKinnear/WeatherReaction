import { useState } from 'react';

export function useGeocoding(apiKey) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);

  async function search(city) {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ q: city, limit: 5, appid: apiKey });
      const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?${params}`);
      // Catching HTTP errors
      if (!res.ok) {
        throw new Error(`API error ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      // No matches found
      if (!Array.isArray(data) || data.length === 0) {
        // Clears old results
        setResults([]);
        throw new Error("No locations found, please try another search.");
      }
      //Stores data when successful
      setResults(data);
    } catch (err) {
      setError(err);
      //Sets loading back to false
    } finally {
      setLoading(false);
    }
  }

  return { results, search, loading, error };
}