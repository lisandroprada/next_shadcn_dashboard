import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
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

interface PropertyListProps {
  properties: Property[];
}

const PropertyList = ({ properties }: PropertyListProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Imagen</TableHead>
            <TableHead>Propiedad</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Detalles</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead className='text-right'>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell>
                <img
                  src={property.image}
                  alt={property.title}
                  className='h-12 w-16 rounded object-cover'
                />
              </TableCell>
              <TableCell>
                <div>
                  <div className='text-foreground font-medium'>
                    {property.title}
                  </div>
                  <div className='text-muted-foreground line-clamp-1 text-sm'>
                    {property.description}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className='text-muted-foreground flex items-center gap-1'>
                  <MapPin className='h-4 w-4' />
                  <span className='text-sm'>{property.location}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className='text-muted-foreground flex items-center gap-3 text-sm'>
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
              </TableCell>
              <TableCell>
                <Badge variant='secondary'>{formatPrice(property.price)}</Badge>
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex justify-end gap-2'>
                  <Button variant='outline' size='sm'>
                    <Eye className='h-4 w-4' />
                  </Button>
                  <Button variant='default' size='sm'>
                    <Edit className='h-4 w-4' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PropertyList;
