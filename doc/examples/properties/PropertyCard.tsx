import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, MapPin, Bed, Bath, Square } from 'lucide-react';

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

interface PropertyCardProps {
  properties: Property[];
}

const PropertyCard = ({ properties }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {properties.map((property) => (
        <Card
          key={property.id}
          className='overflow-hidden transition-shadow hover:shadow-lg'
        >
          <CardHeader className='p-0'>
            <div className='relative'>
              <img
                src={property.image}
                alt={property.title}
                className='h-48 w-full object-cover'
              />
              <Badge className='bg-primary absolute top-2 right-2'>
                {formatPrice(property.price)}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className='p-4'>
            <h3 className='text-foreground mb-2 text-lg font-semibold'>
              {property.title}
            </h3>
            <p className='text-muted-foreground mb-3 line-clamp-2 text-sm'>
              {property.description}
            </p>

            <div className='text-muted-foreground mb-3 flex items-center gap-1'>
              <MapPin className='h-4 w-4' />
              <span className='text-sm'>{property.location}</span>
            </div>

            <div className='text-muted-foreground flex items-center gap-4 text-sm'>
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
          </CardContent>

          <CardFooter className='flex gap-2 p-4 pt-0'>
            <Button variant='outline' size='sm' className='flex-1'>
              <Eye className='mr-2 h-4 w-4' />
              Ver
            </Button>
            <Button variant='default' size='sm' className='flex-1'>
              <Edit className='mr-2 h-4 w-4' />
              Editar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PropertyCard;
