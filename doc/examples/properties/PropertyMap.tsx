import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Eye, Edit, Bed, Bath, Square } from 'lucide-react';

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  coordinates: [number, number];
}

interface PropertyMapProps {
  properties: Property[];
}

const PropertyMap = ({ properties }: PropertyMapProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className='space-y-6'>
      {/* Map Placeholder */}
      <Card>
        <CardContent className='p-0'>
          <div className='bg-muted relative flex h-96 items-center justify-center overflow-hidden rounded-lg'>
            <div className='space-y-2 text-center'>
              <MapPin className='text-muted-foreground mx-auto h-12 w-12' />
              <div className='text-foreground text-lg font-medium'>
                Vista de Mapa
              </div>
              <div className='text-muted-foreground max-w-sm text-sm'>
                Para habilitar el mapa interactivo, configura tu token de Mapbox
                en la configuración del proyecto.
              </div>
              <Button variant='outline' size='sm'>
                Configurar Mapbox
              </Button>
            </div>

            {/* Mock markers positioned on the placeholder */}
            <div className='bg-primary border-background absolute top-20 left-32 h-4 w-4 animate-pulse rounded-full border-2' />
            <div className='bg-primary border-background absolute top-32 right-24 h-4 w-4 animate-pulse rounded-full border-2' />
            <div className='bg-primary border-background absolute bottom-24 left-24 h-4 w-4 animate-pulse rounded-full border-2' />
            <div className='bg-primary border-background absolute right-32 bottom-32 h-4 w-4 animate-pulse rounded-full border-2' />
          </div>
        </CardContent>
      </Card>

      {/* Properties List Below Map */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {properties.map((property) => (
          <Card key={property.id} className='overflow-hidden'>
            <CardHeader className='pb-3'>
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <CardTitle className='text-lg'>{property.title}</CardTitle>
                  <CardDescription className='mt-1 flex items-center gap-1'>
                    <MapPin className='h-4 w-4' />
                    {property.location}
                  </CardDescription>
                </div>
                <Badge variant='secondary'>{formatPrice(property.price)}</Badge>
              </div>
            </CardHeader>

            <CardContent className='pt-0'>
              <div className='text-muted-foreground mb-4 flex items-center gap-4 text-sm'>
                <div className='flex items-center gap-1'>
                  <Bed className='h-4 w-4' />
                  <span>{property.bedrooms}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Bath className='h-4 w-4' />
                  <span>{property.bathrooms}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Square className='h-4 w-4' />
                  <span>{property.area}m²</span>
                </div>
              </div>

              <div className='flex gap-2'>
                <Button variant='outline' size='sm' className='flex-1'>
                  <Eye className='mr-2 h-4 w-4' />
                  Ver
                </Button>
                <Button variant='default' size='sm' className='flex-1'>
                  <Edit className='mr-2 h-4 w-4' />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PropertyMap;
