import { Property } from "@/types/property";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface PropertyMapProps {
  properties: Property[];
  onPropertyClick?: (property: Property) => void;
}

export function PropertyMap({ properties, onPropertyClick }: PropertyMapProps) {
  return (
    <div className="h-full bg-muted rounded-lg flex items-center justify-center">
      <Card className="w-96 mx-auto">
        <CardContent className="p-8 text-center">
          <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Vista de Mapa</h3>
          <p className="text-muted-foreground mb-4">
            La funcionalidad del mapa estará disponible próximamente.
          </p>
          <div className="text-sm text-muted-foreground">
            Propiedades encontradas: {properties.length}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}