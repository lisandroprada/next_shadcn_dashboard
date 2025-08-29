import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Product',
    url: '/dashboard/product',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
      {
        title: 'Login',
        shortcut: ['l', 'l'],
        url: '/',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Aplicaciones',
    url: '#',
    icon: 'billing',
    items: [
      {
        title: 'Propiedades',
        shortcut: ['p', 'p'],
        url: '/dashboard/properties',
        icon: 'page'
      },
      {
        title: 'Clientes',
        shortcut: ['c', 'c'],
        url: '/dashboard/parties',
        icon: 'user'
      },
      {
        title: 'Contratos',
        shortcut: ['m', 'm'],
        url: '/dashboard/contratos',
        icon: 'post'
      }
    ]
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];

export const mockProperties = [
  {
    id: 1,
    title: 'Casa Familiar en Zona Norte',
    description:
      'Hermosa casa de 3 habitaciones con jardín amplio, perfecta para familias. Ubicada en zona residencial tranquila.',
    price: 285000,
    location: 'Zona Norte, Ciudad',
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    coordinates: [-58.3816, -34.6037] as [number, number]
  },
  {
    id: 2,
    title: 'Apartamento Moderno Centro',
    description:
      'Apartamento de lujo en el corazón de la ciudad con vista panorámica y amenidades completas.',
    price: 195000,
    location: 'Centro, Ciudad',
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    coordinates: [-58.3816, -34.6137] as [number, number]
  },
  {
    id: 3,
    title: 'Villa con Piscina',
    description:
      'Exclusiva villa con piscina privada, jardín tropical y múltiples espacios de entretenimiento.',
    price: 450000,
    location: 'Zona Premium, Ciudad',
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop',
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    coordinates: [-58.3916, -34.5937] as [number, number]
  },
  {
    id: 4,
    title: 'Duplex Contemporáneo',
    description:
      'Duplex de diseño contemporáneo con acabados premium y espacios integrados únicos.',
    price: 320000,
    location: 'Zona Oeste, Ciudad',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    coordinates: [-58.4016, -34.6037] as [number, number]
  }
];
