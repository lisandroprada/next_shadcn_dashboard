
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useLocationSearch = (searchTerm: string, searchType: 'province' | 'locality', provinceId?: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedSearchTerm.length < 2) {
        setData([]);
        return;
      }

      setLoading(true);
      try {
        let url = '';
        if (searchType === 'province') {
          url = `${API_URL}/v1/location/provinces/search?name=${debouncedSearchTerm}`;
        } else if (searchType === 'locality' && provinceId) {
          url = `${API_URL}/v1/location/localities/search?name=${debouncedSearchTerm}&provinceId=${provinceId}`;
        } else {
          setData([]);
          setLoading(false);
          return;
        }

        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching location data:', error);
        setData([]);
      }
      setLoading(false);
    };

    fetchData();
  }, [debouncedSearchTerm, searchType, provinceId]);

  return { data, loading };
};
