import { useState, useEffect } from 'react';
import { Property } from '../components/columns';

export const useProperty = (id: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (id === 'new') {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/v1/property/${id}`);
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return { property, loading };
};