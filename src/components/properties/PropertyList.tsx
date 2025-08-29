import { Heart, MapPin, Bed, Bath, Square, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/types/property";

interface PropertyListProps {
  property: Property;
  onClick?: () => void;
}

export function PropertyList({ property, onClick }: PropertyListProps) {
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
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-0">
        <div className="flex">
          {/* Imagen */}
          <div className="relative w-48 h-32 flex-shrink-0">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2">
              <Badge variant={getStatusColor(property.status)} className="capitalize text-xs">
                {property.status}
              </Badge>
            </div>
          </div>

          {/* Contenido */}
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                    <div className="flex items-center text-muted-foreground text-sm mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{property.location.address}, {property.location.city}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {property.description}
                </p>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {getTypeLabel(property.type)}
                  </Badge>
                  
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>{property.bedrooms} hab.</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms} baños</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    <span>{property.area}m²</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(property.createdAt)}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {property.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {property.features.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{property.features.length - 3} más
                    </Badge>
                  )}
                </div>
              </div>

              {/* Precio y acción */}
              <div className="ml-4 text-right space-y-2">
                <div className="text-2xl font-bold text-primary">
                  {formatPrice(property.price, property.status)}
                </div>
                <Button size="sm" className="w-full">
                  Ver detalles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}