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

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Casa Moderna en Zona Residencial',
    description:
      'Hermosa casa de 3 plantas con jardín privado y piscina. Ubicada en zona exclusiva con excelente conectividad.',
    price: 450000,
    type: 'casa',
    status: 'venta',
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    location: {
      address: 'Calle Los Rosales 123',
      city: 'Madrid',
      coordinates: { lat: 40.4168, lng: -3.7038 }
    },
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'
    ],
    features: ['Piscina', 'Jardín', 'Garage', 'Terraza'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Apartamento Céntrico con Vista',
    description:
      'Moderno apartamento en el centro de la ciudad con vistas panorámicas. Completamente renovado.',
    price: 1200,
    type: 'apartamento',
    status: 'alquiler',
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    location: {
      address: 'Avenida Principal 456',
      city: 'Barcelona',
      coordinates: { lat: 41.3851, lng: 2.1734 }
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
    ],
    features: ['Aire acondicionado', 'Ascensor', 'Balcón', 'Amueblado'],
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    title: 'Local Comercial Estratégico',
    description:
      'Local comercial en zona de alta afluencia, perfecto para cualquier tipo de negocio.',
    price: 2500,
    type: 'local',
    status: 'alquiler',
    bedrooms: 0,
    bathrooms: 1,
    area: 120,
    location: {
      address: 'Plaza del Comercio 789',
      city: 'Valencia',
      coordinates: { lat: 39.4699, lng: -0.3763 }
    },
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'
    ],
    features: ['Escaparate', 'Almacén', 'Zona de carga'],
    createdAt: '2024-01-25'
  },
  {
    id: '4',
    title: 'Oficina Moderna en Torre Ejecutiva',
    description:
      'Oficina de lujo en torre corporativa con todas las comodidades. Vista espectacular de la ciudad.',
    price: 3500,
    type: 'oficina',
    status: 'alquiler',
    bedrooms: 0,
    bathrooms: 2,
    area: 200,
    location: {
      address: 'Torre Business Center, Piso 15',
      city: 'Madrid',
      coordinates: { lat: 40.4168, lng: -3.7038 }
    },
    images: [
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ],
    features: [
      'Climatización',
      'Seguridad 24h',
      'Parking',
      'Sala de reuniones'
    ],
    createdAt: '2024-02-01'
  },
  {
    id: '5',
    title: 'Casa de Campo con Amplio Terreno',
    description:
      'Casa rústica restaurada con gran terreno, ideal para descanso o inversión rural.',
    price: 320000,
    type: 'casa',
    status: 'venta',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    location: {
      address: 'Camino Rural Km 12',
      city: 'Segovia',
      coordinates: { lat: 40.9429, lng: -4.1088 }
    },
    images: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    features: ['Chimenea', 'Pozo de agua', 'Huerto', 'Barbacoa'],
    createdAt: '2024-02-05'
  },
  {
    id: '6',
    title: 'Apartamento de Lujo Frente al Mar',
    description:
      'Exclusivo apartamento con acceso directo a la playa. Calidades premium y diseño contemporáneo.',
    price: 850000,
    type: 'apartamento',
    status: 'venta',
    bedrooms: 3,
    bathrooms: 2,
    area: 140,
    location: {
      address: 'Paseo Marítimo 101',
      city: 'Alicante',
      coordinates: { lat: 38.3452, lng: -0.481 }
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    features: [
      'Vista al mar',
      'Piscina comunitaria',
      'Parking subterráneo',
      'Portero'
    ],
    createdAt: '2024-02-10'
  },
  {
    id: '7',
    title: 'Chalet Familiar con Piscina',
    description:
      'Amplio chalet familiar de dos plantas con jardín privado, piscina y zona de barbacoa. Ideal para familias.',
    price: 520000,
    type: 'casa',
    status: 'venta',
    bedrooms: 5,
    bathrooms: 3,
    area: 320,
    location: {
      address: 'Urbanización Las Palmeras 15',
      city: 'Valencia',
      coordinates: { lat: 39.4699, lng: -0.3763 }
    },
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
    ],
    features: [
      'Piscina',
      'Jardín privado',
      'Barbacoa',
      'Trastero',
      'Aire acondicionado'
    ],
    createdAt: '2024-02-12'
  },
  {
    id: '8',
    title: 'Oficina Moderna en Distrito Financiero',
    description:
      'Oficina completamente equipada en edificio corporativo. Excelente ubicación para negocios.',
    price: 2800,
    type: 'oficina',
    status: 'alquiler',
    bedrooms: 0,
    bathrooms: 2,
    area: 120,
    location: {
      address: 'Torre Empresarial, Piso 12',
      city: 'Madrid',
      coordinates: { lat: 40.4168, lng: -3.7038 }
    },
    images: [
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ],
    features: [
      'Aire acondicionado',
      'Recepción',
      'Sala de reuniones',
      'Parking'
    ],
    createdAt: '2024-02-15'
  },
  {
    id: '9',
    title: 'Apartamento Estudiantes Centro',
    description:
      'Acogedor apartamento ideal para estudiantes o parejas jóvenes. Totalmente amueblado.',
    price: 850,
    type: 'apartamento',
    status: 'alquiler',
    bedrooms: 2,
    bathrooms: 1,
    area: 60,
    location: {
      address: 'Calle Universidad 45',
      city: 'Barcelona',
      coordinates: { lat: 41.3851, lng: 2.1734 }
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
    ],
    features: ['Amueblado', 'Calefacción', 'Internet incluido', 'Lavadora'],
    createdAt: '2024-02-18'
  },
  {
    id: '10',
    title: 'Local Comercial Esquina',
    description:
      'Excelente local comercial en esquina, alta visibilidad. Perfecto para cualquier tipo de negocio.',
    price: 3500,
    type: 'local',
    status: 'alquiler',
    bedrooms: 0,
    bathrooms: 1,
    area: 180,
    location: {
      address: 'Avenida Principal esquina',
      city: 'Sevilla',
      coordinates: { lat: 37.3891, lng: -5.9845 }
    },
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800'
    ],
    features: ['Esquina', 'Escaparate grande', 'Almacén', 'Acceso rodado'],
    createdAt: '2024-02-20'
  },
  {
    id: '11',
    title: 'Casa Rural con Viñedos',
    description:
      'Hermosa casa rural rodeada de viñedos. Perfecta para turismo rural o residencia permanente.',
    price: 380000,
    type: 'casa',
    status: 'venta',
    bedrooms: 4,
    bathrooms: 2,
    area: 250,
    location: {
      address: 'Camino de los Viñedos km 3',
      city: 'Segovia',
      coordinates: { lat: 40.9429, lng: -4.1088 }
    },
    images: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    features: ['Viñedos', 'Bodega', 'Chimenea', 'Jardín', 'Pozo'],
    createdAt: '2024-02-22'
  },
  {
    id: '12',
    title: 'Loft Industrial Renovado',
    description:
      'Espectacular loft en antigua fábrica completamente renovada. Techos altos y mucha luz natural.',
    price: 420000,
    type: 'apartamento',
    status: 'venta',
    bedrooms: 2,
    bathrooms: 2,
    area: 150,
    location: {
      address: 'Barrio Industrial 22',
      city: 'Bilbao',
      coordinates: { lat: 43.263, lng: -2.935 }
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    features: ['Techos altos', 'Loft', 'Terraza', 'Ascensor', 'Diseño moderno'],
    createdAt: '2024-02-25'
  },
  {
    id: '13',
    title: 'Casa Adosada con Jardín',
    description:
      'Cómoda casa adosada en urbanización privada con jardín propio y plaza de garaje.',
    price: 295000,
    type: 'casa',
    status: 'venta',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    location: {
      address: 'Urbanización Los Olivos 8',
      city: 'Alicante',
      coordinates: { lat: 38.3452, lng: -0.481 }
    },
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
    ],
    features: ['Jardín privado', 'Garaje', 'Piscina comunitaria', 'Trastero'],
    createdAt: '2024-02-28'
  },
  {
    id: '14',
    title: 'Oficina Compartida Coworking',
    description:
      'Espacio de trabajo flexible en edificio moderno. Ideal para startups y freelancers.',
    price: 450,
    type: 'oficina',
    status: 'alquiler',
    bedrooms: 0,
    bathrooms: 2,
    area: 25,
    location: {
      address: 'Hub Innovación, Despacho 15',
      city: 'Barcelona',
      coordinates: { lat: 41.3851, lng: 2.1734 }
    },
    images: [
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ],
    features: ['Coworking', 'WiFi', 'Café incluido', 'Salas de reuniones'],
    createdAt: '2024-03-02'
  },
  {
    id: '15',
    title: 'Apartamento Lujo Puerto Deportivo',
    description:
      'Exclusivo apartamento con vistas al puerto deportivo. Calidades de lujo y ubicación premium.',
    price: 1200000,
    type: 'apartamento',
    status: 'venta',
    bedrooms: 3,
    bathrooms: 3,
    area: 200,
    location: {
      address: 'Marina Real 5',
      city: 'Valencia',
      coordinates: { lat: 39.4699, lng: -0.3763 }
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    features: [
      'Vista puerto',
      'Terraza',
      'Parking doble',
      'Portero 24h',
      'Spa'
    ],
    createdAt: '2024-03-05'
  },
  {
    id: '16',
    title: 'Local Gastronómico Equipado',
    description:
      'Local completamente equipado para restaurante. Cocina industrial y licencia de actividad.',
    price: 4800,
    type: 'local',
    status: 'alquiler',
    bedrooms: 0,
    bathrooms: 2,
    area: 250,
    location: {
      address: 'Zona Gastronómica 12',
      city: 'Madrid',
      coordinates: { lat: 40.4168, lng: -3.7038 }
    },
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800'
    ],
    features: ['Cocina equipada', 'Licencia actividad', 'Terraza', 'Almacén'],
    createdAt: '2024-03-08'
  },
  {
    id: '17',
    title: 'Piso Reformado Centro Histórico',
    description:
      'Apartamento completamente reformado en el corazón del centro histórico. Suelos originales conservados.',
    price: 1100,
    type: 'apartamento',
    status: 'alquiler',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    location: {
      address: 'Plaza Mayor 18',
      city: 'Sevilla',
      coordinates: { lat: 37.3891, lng: -5.9845 }
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
    ],
    features: ['Centro histórico', 'Reformado', 'Suelos originales', 'Balcón'],
    createdAt: '2024-03-10'
  },
  {
    id: '18',
    title: 'Casa Moderna Eficiencia Energética',
    description:
      'Casa de nueva construcción con certificación energética A. Tecnología domótica integrada.',
    price: 650000,
    type: 'casa',
    status: 'venta',
    bedrooms: 4,
    bathrooms: 3,
    area: 290,
    location: {
      address: 'Eco Residencial 7',
      city: 'Bilbao',
      coordinates: { lat: 43.263, lng: -2.935 }
    },
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'
    ],
    features: [
      'Eficiencia A',
      'Domótica',
      'Placas solares',
      'Jardín',
      'Garaje'
    ],
    createdAt: '2024-03-12'
  },
  {
    id: '19',
    title: 'Oficina Ejecutiva Torre Business',
    description:
      'Oficina ejecutiva en la torre empresarial más prestigiosa. Vistas panorámicas de la ciudad.',
    price: 5500,
    type: 'oficina',
    status: 'alquiler',
    bedrooms: 0,
    bathrooms: 1,
    area: 180,
    location: {
      address: 'Torre Business, Piso 25',
      city: 'Madrid',
      coordinates: { lat: 40.4168, lng: -3.7038 }
    },
    images: [
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ],
    features: [
      'Vistas panorámicas',
      'Sala reuniones',
      'Recepción',
      'Parking VIP'
    ],
    createdAt: '2024-03-15'
  },
  {
    id: '20',
    title: 'Apartamento Estudiantes Universitario',
    description:
      'Apartamento especialmente diseñado para estudiantes cerca del campus universitario.',
    price: 720,
    type: 'apartamento',
    status: 'alquiler',
    bedrooms: 3,
    bathrooms: 2,
    area: 90,
    location: {
      address: 'Campus Universitario 33',
      city: 'Valencia',
      coordinates: { lat: 39.4699, lng: -0.3763 }
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
    ],
    features: ['Cerca universidad', 'Amueblado', 'Internet', 'Lavandería'],
    createdAt: '2024-03-18'
  },
  {
    id: '21',
    title: 'Local Comercial Franquicia',
    description:
      'Local perfectamente ubicado para franquicia. Alto tránsito peatonal y excelente visibilidad.',
    price: 2900,
    type: 'local',
    status: 'alquiler',
    bedrooms: 0,
    bathrooms: 1,
    area: 95,
    location: {
      address: 'Centro Comercial Plaza 5',
      city: 'Barcelona',
      coordinates: { lat: 41.3851, lng: 2.1734 }
    },
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800'
    ],
    features: ['Alto tránsito', 'Escaparate', 'Aire acondicionado', 'Almacén'],
    createdAt: '2024-03-20'
  },
  {
    id: '22',
    title: 'Casa de Campo con Establo',
    description:
      'Propiedad rural con casa principal, establo y amplios terrenos. Ideal para actividades ecuestres.',
    price: 890000,
    type: 'casa',
    status: 'venta',
    bedrooms: 5,
    bathrooms: 4,
    area: 400,
    location: {
      address: 'Finca El Robledal',
      city: 'Segovia',
      coordinates: { lat: 40.9429, lng: -4.1088 }
    },
    images: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    features: ['Establo', 'Terrenos', 'Pozo', 'Huerto', 'Casa invitados'],
    createdAt: '2024-03-22'
  },
  {
    id: '23',
    title: 'Dúplex Moderno Urbanización',
    description:
      'Espectacular dúplex en urbanización privada con todas las comodidades y servicios incluidos.',
    price: 395000,
    type: 'apartamento',
    status: 'venta',
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    location: {
      address: 'Residencial Monte Alto 12',
      city: 'Alicante',
      coordinates: { lat: 38.3452, lng: -0.481 }
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    features: ['Dúplex', 'Piscina comunitaria', 'Paddle', 'Seguridad 24h'],
    createdAt: '2024-03-25'
  },
  {
    id: '24',
    title: 'Oficina Startup Tech Hub',
    description:
      'Espacio de oficina en el hub tecnológico más innovador. Ambiente startup y networking.',
    price: 1800,
    type: 'oficina',
    status: 'alquiler',
    bedrooms: 0,
    bathrooms: 1,
    area: 65,
    location: {
      address: 'Tech Hub Innovation 4',
      city: 'Bilbao',
      coordinates: { lat: 43.263, lng: -2.935 }
    },
    images: [
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ],
    features: ['Tech hub', 'Networking', 'Cafetería', 'Eventos'],
    createdAt: '2024-03-28'
  },
  {
    id: '25',
    title: 'Apartamento Luxury Spa Resort',
    description:
      'Apartamento exclusivo en complejo con spa y resort. Servicios de hotel cinco estrellas.',
    price: 2200,
    type: 'apartamento',
    status: 'alquiler',
    bedrooms: 2,
    bathrooms: 2,
    area: 110,
    location: {
      address: 'Luxury Resort 8',
      city: 'Sevilla',
      coordinates: { lat: 37.3891, lng: -5.9845 }
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    features: [
      'Spa incluido',
      'Servicio limpieza',
      'Piscina infinity',
      'Conserje'
    ],
    createdAt: '2024-03-30'
  },
  {
    id: '26',
    title: 'Local Comercial Zona Premium',
    description:
      'Local en la zona comercial más exclusiva de la ciudad. Clientela de alto poder adquisitivo.',
    price: 6500,
    type: 'local',
    status: 'alquiler',
    bedrooms: 0,
    bathrooms: 2,
    area: 200,
    location: {
      address: 'Zona Premium Shopping 1',
      city: 'Madrid',
      coordinates: { lat: 40.4168, lng: -3.7038 }
    },
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800'
    ],
    features: [
      'Zona premium',
      'Clientela VIP',
      'Escaparates grandes',
      'Parking'
    ],
    createdAt: '2024-04-02'
  }
];

export const propertyTypes = [
  { value: 'casa', label: 'Casa' },
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'local', label: 'Local Comercial' },
  { value: 'oficina', label: 'Oficina' }
];

export const propertyStatus = [
  { value: 'venta', label: 'Venta' },
  { value: 'alquiler', label: 'Alquiler' }
];

export const cities = [
  'Madrid',
  'Barcelona',
  'Valencia',
  'Sevilla',
  'Bilbao',
  'Alicante',
  'Segovia'
];
