export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'casa' | 'apartamento' | 'local' | 'oficina';
  status: 'venta' | 'alquiler';
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  features: string[];
  createdAt: string;
}

export interface PropertyFilters {
  type?: string;
  status?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number;
  bathrooms?: number;
}

export type ViewMode = 'card' | 'list' | 'map';
