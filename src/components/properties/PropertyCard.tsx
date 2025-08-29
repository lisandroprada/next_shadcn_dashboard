import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group" onClick={onClick}>
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <Badge variant={getStatusColor(property.status)} className="capitalize">
            {property.status}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge variant="outline" className="bg-white/90">
            {getTypeLabel(property.type)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="line-clamp-1">{property.location.address}, {property.location.city}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {property.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span>{property.area}m²</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-2xl font-bold text-primary">
              {formatPrice(property.price, property.status)}
            </div>
            <Button size="sm">Ver detalles</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}