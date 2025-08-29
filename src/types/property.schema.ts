export interface PropertyImage {
  name: string;
  thumb: string;
  thumbWeb: string;
  imgSlider: string;
  title: string;
  description: string;
  createdAt: Date;
}

export interface Property {
  _id?: string;
  address: string;
  province: string;
  locality: string;
  lat?: number;
  lng?: number;
  gmaps?: {
    formattedAddress: string;
    placeId: string;
  };
  owners: string[];
  tenant?: string;
  consortium?: string;
  suppliers: string[];
  specs: string[];
  type: string;
  purpose: string;
  status: string;
  availableForSale: boolean;
  publishForRent: boolean;
  publishForSale: boolean;
  valueForSale?: {
    amount: number;
    currency: string;
    pricePublic: boolean;
    paymentMethod: string;
    description: string;
    date: Date;
  };
  valueForRent?: {
    amount: number;
    currency: string;
    pricePublic: boolean;
    paymentMethod: string;
    description: string;
    date: Date;
  };
  available: boolean;
  availableAt?: Date;
  associatedServices: string[];
  inventory: {
    item: string;
    quantity: number;
    room: string;
    condition: string;
  }[];
  detailedDescription: {
    availableServices: string[];
    sqFt?: number;
    buildSqFt?: number;
    age?: number;
    petFriendly: boolean;
    rooms?: number;
    bedrooms?: number;
    bathrooms?: number;
    floors?: number;
    orientation?: string;
    title?: string;
    brief?: string;
  };
  expensesType: string;
  img: PropertyImage[];
  imgCover?: {
    name: string;
    thumbWeb: string;
    createdAt: Date;
  };
  createdAt: Date;
  active: boolean;
  user: string;
}

export interface PropertyFormData extends Omit<Property, '_id' | 'createdAt'> {}
