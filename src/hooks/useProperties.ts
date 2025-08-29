import { useState, useMemo } from 'react';
import { PropertyFilters } from '@/types/property';
import { mockProperties } from '@/lib/data';

export function useProperties() {
  const [filters, setFilters] = useState<PropertyFilters>({});

  const filteredProperties = useMemo(() => {
    let result = [...mockProperties];

    // Filter by type
    if (filters.type) {
      result = result.filter((property) => property.type === filters.type);
    }

    // Filter by status
    if (filters.status) {
      result = result.filter((property) => property.status === filters.status);
    }

    // Filter by city
    if (filters.city) {
      result = result.filter(
        (property) => property.location.city === filters.city
      );
    }

    // Filter by price range
    if (filters.minPrice !== undefined) {
      result = result.filter((property) => property.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((property) => property.price <= filters.maxPrice!);
    }

    // Filter by area range
    if (filters.minArea !== undefined) {
      result = result.filter((property) => property.area >= filters.minArea!);
    }
    if (filters.maxArea !== undefined) {
      result = result.filter((property) => property.area <= filters.maxArea!);
    }

    // Filter by bedrooms
    if (filters.bedrooms !== undefined) {
      result = result.filter(
        (property) => property.bedrooms >= filters.bedrooms!
      );
    }

    // Filter by bathrooms
    if (filters.bathrooms !== undefined) {
      result = result.filter(
        (property) => property.bathrooms >= filters.bathrooms!
      );
    }

    return result;
  }, [filters]);

  const clearFilters = () => {
    setFilters({});
  };

  return {
    properties: filteredProperties,
    filters,
    setFilters,
    clearFilters,
    totalProperties: filteredProperties.length
  };
}
