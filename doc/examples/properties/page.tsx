import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid, List, Map, Plus } from 'lucide-react';
import PropertyCard from './PropertyCard';
import PropertyList from './PropertyList';
import PropertyMap from './PropertyMap';

// Mock data for properties
const mockProperties = [
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

const Properties = () => {
  const [view, setView] = useState('cards');

  return (
    <div className='bg-background min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col gap-6'>
          {/* Header */}
          <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
            <div>
              <h1 className='text-foreground text-3xl font-bold'>
                Propiedades
              </h1>
              <p className='text-muted-foreground'>
                Administra tu portafolio de propiedades
              </p>
            </div>
            <Button className='sm:w-auto'>
              <Plus className='mr-2 h-4 w-4' />
              Nueva Propiedad
            </Button>
          </div>

          {/* View Controls */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Vista</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={view} onValueChange={setView} className='w-full'>
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger
                    value='cards'
                    className='flex items-center gap-2'
                  >
                    <Grid className='h-4 w-4' />
                    Tarjetas
                  </TabsTrigger>
                  <TabsTrigger value='list' className='flex items-center gap-2'>
                    <List className='h-4 w-4' />
                    Lista
                  </TabsTrigger>
                  <TabsTrigger value='map' className='flex items-center gap-2'>
                    <Map className='h-4 w-4' />
                    Mapa
                  </TabsTrigger>
                </TabsList>

                <TabsContent value='cards' className='mt-6'>
                  <PropertyCard properties={mockProperties} />
                </TabsContent>

                <TabsContent value='list' className='mt-6'>
                  <PropertyList properties={mockProperties} />
                </TabsContent>

                <TabsContent value='map' className='mt-6'>
                  <PropertyMap properties={mockProperties} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Properties;
