import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Property } from '@/types/property';
import { useRouter } from 'next/navigation';

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  const router = useRouter();
  const formatPrice = (price: number, status: string) => {
    if (status === 'alquiler') {
      return `€${price.toLocaleString()}/mes`;
    }
    return `€${price.toLocaleString()}`;
  };

  const getTypeLabel = (type: string) => {
    const types = {
      casa: 'Casa',
      apartamento: 'Apartamento',
      local: 'Local',
      oficina: 'Oficina'
    };
    return types[type as keyof typeof types] || type;
  };

  const getStatusColor = (status: string) => {
    return status === 'venta' ? 'default' : 'secondary';
  };

  return (
    <Card
      className='group cursor-pointer overflow-hidden transition-shadow hover:shadow-lg'
      onClick={onClick}
    >
      <div className='relative'>
        <img
          src={property.images[0]}
          alt={property.title}
          className='h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105'
        />
        <div className='absolute top-2 left-2'>
          <Badge
            variant={getStatusColor(property.status)}
            className='capitalize'
          >
            {property.status}
          </Badge>
        </div>
        <div className='absolute top-2 right-2'>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8 bg-white/80 hover:bg-white'
          >
            <Heart className='h-4 w-4' />
          </Button>
        </div>
        <div className='absolute bottom-2 left-2'>
          <Badge variant='outline' className='bg-white/90'>
            {getTypeLabel(property.type)}
          </Badge>
        </div>
      </div>

      <CardContent className='p-4'>
        <div className='space-y-3'>
          <div>
            <h3 className='line-clamp-1 text-lg font-semibold'>
              {property.title}
            </h3>
            <div className='text-muted-foreground mt-1 flex items-center text-sm'>
              <MapPin className='mr-1 h-3 w-3' />
              <span className='line-clamp-1'>
                {property.location.address}, {property.location.city}
              </span>
            </div>
          </div>

          <p className='text-muted-foreground line-clamp-2 text-sm'>
            {property.description}
          </p>

          <div className='text-muted-foreground flex items-center gap-4 text-sm'>
            {property.bedrooms > 0 && (
              <div className='flex items-center gap-1'>
                <Bed className='h-4 w-4' />
                <span>{property.bedrooms}</span>
              </div>
            )}
            <div className='flex items-center gap-1'>
              <Bath className='h-4 w-4' />
              <span>{property.bathrooms}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Square className='h-4 w-4' />
              <span>{property.area}m²</span>
            </div>
          </div>

          <div className='flex items-center justify-between border-t pt-2'>
            <div className='text-primary text-2xl font-bold'>
              {formatPrice(property.price, property.status)}
            </div>
            <div className='flex gap-2'>
              <Button
                size='sm'
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/dashboard/properties/${property.id}`);
                }}
              >
                Editar
              </Button>
              <Button size='sm'>Ver detalles</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
