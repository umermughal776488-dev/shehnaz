import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';

export function useSanityData<T>(query: string, params: Record<string, any> = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    client
      .fetch(query, params)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Sanity fetch error:', err);
        setError(err);
        setLoading(false);
      });
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
}
