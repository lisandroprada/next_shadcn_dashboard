import { Heart, MapPin, Bed, Bath, Square, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Property } from '@/types/property';
import { useRouter } from 'next/navigation';

interface PropertyListProps {
  property: Property;
  onClick?: () => void;
}

export function PropertyList({ property, onClick }: PropertyListProps) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  return (
    <Card
      className='cursor-pointer overflow-hidden transition-shadow hover:shadow-md'
      onClick={onClick}
    >
      <CardContent className='p-0'>
        <div className='flex'>
          {/* Imagen */}
          <div className='relative h-32 w-48 flex-shrink-0'>
            <img
              src={property.images[0]}
              alt={property.title}
              className='h-full w-full object-cover'
            />
            <div className='absolute top-2 left-2'>
              <Badge
                variant={getStatusColor(property.status)}
                className='text-xs capitalize'
              >
                {property.status}
              </Badge>
            </div>
          </div>

          {/* Contenido */}
          <div className='flex-1 p-4'>
            <div className='flex items-start justify-between'>
              <div className='flex-1 space-y-2'>
                <div className='flex items-start justify-between'>
                  <div>
                    <h3 className='line-clamp-1 text-lg font-semibold'>
                      {property.title}
                    </h3>
                    <div className='text-muted-foreground mt-1 flex items-center text-sm'>
                      <MapPin className='mr-1 h-3 w-3' />
                      <span>
                        {property.location.address}, {property.location.city}
                      </span>
                    </div>
                  </div>
                  <Button variant='ghost' size='icon' className='h-8 w-8'>
                    <Heart className='h-4 w-4' />
                  </Button>
                </div>

                <p className='text-muted-foreground line-clamp-2 text-sm'>
                  {property.description}
                </p>

                <div className='text-muted-foreground flex items-center gap-6 text-sm'>
                  <Badge variant='outline' className='text-xs'>
                    {getTypeLabel(property.type)}
                  </Badge>

                  {property.bedrooms > 0 && (
                    <div className='flex items-center gap-1'>
                      <Bed className='h-4 w-4' />
                      <span>{property.bedrooms} hab.</span>
                    </div>
                  )}

                  <div className='flex items-center gap-1'>
                    <Bath className='h-4 w-4' />
                    <span>{property.bathrooms} baños</span>
                  </div>

                  <div className='flex items-center gap-1'>
                    <Square className='h-4 w-4' />
                    <span>{property.area}m²</span>
                  </div>

                  <div className='flex items-center gap-1'>
                    <Calendar className='h-4 w-4' />
                    <span>{formatDate(property.createdAt)}</span>
                  </div>
                </div>

                {/* Features */}
                <div className='flex flex-wrap gap-1'>
                  {property.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant='secondary' className='text-xs'>
                      {feature}
                    </Badge>
                  ))}
                  {property.features.length > 3 && (
                    <Badge variant='secondary' className='text-xs'>
                      +{property.features.length - 3} más
                    </Badge>
                  )}
                </div>
              </div>

              {/* Precio y acción */}
              <div className='ml-4 space-y-2 text-right'>
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
                  <Button size='sm' className='w-full'>
                    Ver detalles
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
