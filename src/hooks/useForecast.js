import { useState, useEffect } from 'react';

export function useForecast(loc, apiKey) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    //If no location selected, do nothing
    if (!loc) return;
    //Starts loading state and reset previous errors
    setLoading(true);
    setError(null);
    //Creates URLSearchParams
    const params = new URLSearchParams({
      lat:      loc.lat,
      lon:      loc.lon,
      exclude:  'minutely,alerts',
      units:    'metric',
      appid:    apiKey,
    });
    //Performs the fetch
    fetch(`https://api.openweathermap.org/data/3.0/onecall?${params}`)
      .then((r) => r.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
    //run effect again only when location or apiKey changes
  }, [loc, apiKey]);

  return { data, loading, error };
}