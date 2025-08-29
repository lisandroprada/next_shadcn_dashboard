import { Party } from '@/types/party';

export const mockParties: Party[] = [
  {
    _id: '1',
    agentType: 'Client',
    personType: 'Individual',
    name: 'María',
    lastName: 'García',
    fullName: 'María García',
    gender: 'Female',
    email: 'maria.garcia@email.com',
    identityCard: '12345678',
    phone: [{ number: '+54 11 1234-5678', type: 'whatsapp' }],
    bankAccounts: [
      {
        bank: 'Banco Nación',
        cbu: '0110599520000001234567',
        description: 'Cuenta principal'
      }
    ],
    address: 'Av. Corrientes 1234, CABA',
    active: true,
    billing: true,
    createdAt: new Date('2024-01-15'),
    consortiumDetails: [],
    postalCode: '1043'
  },
  {
    _id: '2',
    agentType: 'Supplier',
    personType: 'Legal Entity',
    name: 'TechCorp Solutions',
    fullName: 'TechCorp Solutions',
    email: 'contacto@techcorp.com',
    identityCard: '30712345678',
    phone: [{ number: '+54 11 9876-5432', type: 'work' }],
    bankAccounts: [
      {
        bank: 'Banco Santander',
        cbu: '0720599520000009876543',
        description: 'Cuenta corriente'
      }
    ],
    address: 'Av. Santa Fe 2500, CABA',
    active: true,
    billing: true,
    createdAt: new Date('2024-02-20'),
    consortiumDetails: [],
    taxId: '30712345678',
    taxType: 'CUIT'
  },
  {
    _id: '3',
    agentType: 'Client',
    personType: 'Individual',
    name: 'Carlos',
    lastName: 'Rodríguez',
    fullName: 'Carlos Rodríguez',
    gender: 'Male',
    email: 'carlos.rodriguez@email.com',
    identityCard: '87654321',
    phone: [
      { number: '+54 11 5555-4444', type: 'home' },
      { number: '+54 9 11 3333-2222', type: 'whatsapp' }
    ],
    bankAccounts: [],
    address: 'Belgrano 800, La Plata',
    active: false,
    billing: false,
    createdAt: new Date('2024-03-10'),
    consortiumDetails: [],
    maritalStatus: 'Married'
  },
  {
    _id: '4',
    agentType: 'Agency',
    personType: 'Legal Entity',
    name: 'Inmobiliaria del Centro',
    fullName: 'Inmobiliaria del Centro',
    email: 'info@inmobiliariacentro.com',
    identityCard: '27123456789',
    phone: [{ number: '+54 11 4444-3333', type: 'work' }],
    bankAccounts: [
      {
        bank: 'Banco BBVA',
        cbu: '0170599520000005555555',
        description: 'Operaciones'
      }
    ],
    address: 'Florida 500, CABA',
    active: true,
    billing: true,
    createdAt: new Date('2024-01-05'),
    consortiumDetails: [],
    agent: {
      fullName: 'Ana López',
      email: 'ana.lopez@inmobiliariacentro.com',
      identityCard: '98765432',
      gender: 'Female'
    }
  },
  {
    _id: '5',
    agentType: 'Consortium',
    personType: 'Legal Entity',
    name: 'Consorcio Torres del Sol',
    fullName: 'Consorcio Torres del Sol',
    email: 'admin@torresdelsol.com',
    identityCard: '33123456789',
    phone: [{ number: '+54 11 6666-7777', type: 'work' }],
    bankAccounts: [
      {
        bank: 'Banco Macro',
        cbu: '2850599520000007777777',
        description: 'Expensas'
      }
    ],
    address: 'Av. del Libertador 3000, Vicente López',
    active: true,
    billing: true,
    createdAt: new Date('2024-02-01'),
    consortiumDetails: [
      { expenseName: 'Expensas Comunes', expenseAmount: 45000 },
      { expenseName: 'Fondo de Reserva', expenseAmount: 8000 }
    ]
  },
  {
    _id: '6',
    agentType: 'Client',
    personType: 'Individual',
    name: 'Laura',
    lastName: 'Martínez',
    fullName: 'Laura Martínez',
    gender: 'Female',
    email: 'laura.martinez@email.com',
    identityCard: '11223344',
    phone: [{ number: '+54 9 11 8888-9999', type: 'whatsapp' }],
    bankAccounts: [
      {
        bank: 'Banco Galicia',
        cbu: '0070599520000008888888',
        description: 'Ahorros'
      }
    ],
    address: 'San Martín 1500, Rosario',
    active: true,
    billing: false,
    createdAt: new Date('2024-03-25'),
    consortiumDetails: [],
    province: 'Santa Fe',
    locality: 'Rosario'
  },
  {
    _id: '7',
    agentType: 'Client',
    personType: 'Individual',
    name: 'Joaquín',
    lastName: 'Pérez',
    fullName: 'Joaquín Pérez',
    gender: 'Male',
    email: 'joaquin.perez@email.com',
    identityCard: '22334455',
    phone: [{ number: '+54 9 11 1234-5678', type: 'whatsapp' }],
    bankAccounts: [
      {
        bank: 'Banco Nación',
        cbu: '0110599520000002233445',
        description: 'Cuenta sueldo'
      }
    ],
    address: 'Av. Rivadavia 2000, CABA',
    active: true,
    billing: true,
    createdAt: new Date('2024-04-01'),
    consortiumDetails: [],
    province: 'Buenos Aires',
    locality: 'CABA'
  },
  {
    _id: '8',
    agentType: 'Client',
    personType: 'Individual',
    name: 'Sofía',
    lastName: 'Fernández',
    fullName: 'Sofía Fernández',
    gender: 'Female',
    email: 'sofia.fernandez@email.com',
    identityCard: '33445566',
    phone: [{ number: '+54 9 11 2345-6789', type: 'whatsapp' }],
    bankAccounts: [
      {
        bank: 'Banco Provincia',
        cbu: '0140599520000003344556',
        description: 'Caja de ahorro'
      }
    ],
    address: 'Mitre 500, Quilmes',
    active: true,
    billing: false,
    createdAt: new Date('2024-04-10'),
    consortiumDetails: [],
    province: 'Buenos Aires',
    locality: 'Quilmes'
  },
  {
    _id: '9',
    agentType: 'Client',
    personType: 'Individual',
    name: 'Martín',
    lastName: 'Gómez',
    fullName: 'Martín Gómez',
    gender: 'Male',
    email: 'martin.gomez@email.com',
    identityCard: '44556677',
    phone: [{ number: '+54 9 11 3456-7890', type: 'whatsapp' }],
    bankAccounts: [],
    address: 'Córdoba 1200, Córdoba',
    active: false,
    billing: false,
    createdAt: new Date('2024-04-15'),
    consortiumDetails: [],
    province: 'Córdoba',
    locality: 'Córdoba'
  },
  {
    _id: '10',
    agentType: 'Client',
    personType: 'Individual',
    name: 'Valentina',
    lastName: 'Ruiz',
    fullName: 'Valentina Ruiz',
    gender: 'Female',
    email: 'valentina.ruiz@email.com',
    identityCard: '55667788',
    phone: [{ number: '+54 9 11 4567-8901', type: 'whatsapp' }],
    bankAccounts: [
      {
        bank: 'Banco Patagonia',
        cbu: '0340599520000005566778',
        description: 'Cuenta personal'
      }
    ],
    address: 'San Juan 300, Mendoza',
    active: true,
    billing: true,
    createdAt: new Date('2024-04-20'),
    consortiumDetails: [],
    province: 'Mendoza',
    locality: 'Mendoza'
  },
  {
    _id: '11',
    agentType: 'Client',
    personType: 'Individual',
    name: 'Lucía',
    lastName: 'Sánchez',
    fullName: 'Lucía Sánchez',
    gender: 'Female',
    email: 'lucia.sanchez@email.com',
    identityCard: '66778899',
    phone: [{ number: '+54 9 11 5678-9012', type: 'whatsapp' }],
    bankAccounts: [],
    address: 'Av. Alem 900, Bahía Blanca',
    active: false,
    billing: false,
    createdAt: new Date('2024-04-25'),
    consortiumDetails: [],
    province: 'Buenos Aires',
    locality: 'Bahía Blanca'
  },
  {
    _id: '12',
    agentType: 'Client',
    personType: 'Individual',
    name: 'Federico',
    lastName: 'López',
    fullName: 'Federico López',
    gender: 'Male',
    email: 'federico.lopez@email.com',
    identityCard: '77889900',
    phone: [{ number: '+54 9 11 6789-0123', type: 'whatsapp' }],
    bankAccounts: [
      {
        bank: 'Banco HSBC',
        cbu: '1500599520000007788990',
        description: 'Cuenta corriente'
      }
    ],
    address: 'Mitre 200, Mar del Plata',
    active: true,
    billing: false,
    createdAt: new Date('2024-05-01'),
    consortiumDetails: [],
    province: 'Buenos Aires',
    locality: 'Mar del Plata'
  },
  {
    _id: '13',
    agentType: 'Client',
    personType: 'Individual',
    name: 'Camila',
    lastName: 'Moreno',
    fullName: 'Camila Moreno',
    gender: 'Female',
    email: 'camila.moreno@email.com',
    identityCard: '88990011',
    phone: [{ number: '+54 9 11 7890-1234', type: 'whatsapp' }],
    bankAccounts: [],
    address: 'Av. Colón 1500, Salta',
    active: true,
    billing: true,
    createdAt: new Date('2024-05-05'),
    consortiumDetails: [],
    province: 'Salta',
    locality: 'Salta'
  },
  {
    _id: '14',
    agentType: 'Client',
    personType: 'Individual',
    name: 'Tomás',
    lastName: 'Castro',
    fullName: 'Tomás Castro',
    gender: 'Male',
    email: 'tomas.castro@email.com',
    identityCard: '99001122',
    phone: [{ number: '+54 9 11 8901-2345', type: 'whatsapp' }],
    bankAccounts: [
      {
        bank: 'Banco Credicoop',
        cbu: '1910599520000009900112',
        description: 'Cuenta joven'
      }
    ],
    address: 'Av. Pellegrini 800, Rosario',
    active: false,
    billing: false,
    createdAt: new Date('2024-05-10'),
    consortiumDetails: [],
    province: 'Santa Fe',
    locality: 'Rosario'
  },
  {
    _id: '15',
    agentType: 'Client',
    personType: 'Individual',
    name: 'Agustina',
    lastName: 'Vega',
    fullName: 'Agustina Vega',
    gender: 'Female',
    email: 'agustina.vega@email.com',
    identityCard: '10111213',
    phone: [{ number: '+54 9 11 9012-3456', type: 'whatsapp' }],
    bankAccounts: [],
    address: 'Av. San Martín 300, San Juan',
    active: true,
    billing: true,
    createdAt: new Date('2024-05-15'),
    consortiumDetails: [],
    province: 'San Juan',
    locality: 'San Juan'
  },
  {
    _id: '16',
    agentType: 'Client',
    personType: 'Individual',
    name: 'Nicolás',
    lastName: 'Silva',
    fullName: 'Nicolás Silva',
    gender: 'Male',
    email: 'nicolas.silva@email.com',
    identityCard: '11121314',
    phone: [{ number: '+54 9 11 0123-4567', type: 'whatsapp' }],
    bankAccounts: [
      {
        bank: 'Banco Itaú',
        cbu: '2590599520000001112131',
        description: 'Cuenta personal'
      }
    ],
    address: 'Av. Independencia 100, Tucumán',
    active: true,
    billing: false,
    createdAt: new Date('2024-05-20'),
    consortiumDetails: [],
    province: 'Tucumán',
    locality: 'San Miguel de Tucumán'
  }
];
