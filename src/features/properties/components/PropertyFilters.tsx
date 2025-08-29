import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { PropertyFilters as IPropertyFilters } from "@/types/property";
import { propertyTypes, propertyStatus, cities } from "@/lib/data";

interface PropertyFiltersProps {
  filters: IPropertyFilters;
  onFiltersChange: (filters: IPropertyFilters) => void;
  onClear: () => void;
}

export function PropertyFilters({ filters, onFiltersChange, onClear }: PropertyFiltersProps) {
  const [priceRange, setPriceRange] = useState([filters.minPrice || 0, filters.maxPrice || 1000000]);
  const [areaRange, setAreaRange] = useState([filters.minArea || 0, filters.maxArea || 500]);

  const handleFilterChange = (key: keyof IPropertyFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    onFiltersChange({ 
      ...filters, 
      minPrice: values[0], 
      maxPrice: values[1] 
    });
  };

  const handleAreaChange = (values: number[]) => {
    setAreaRange(values);
    onFiltersChange({ 
      ...filters, 
      minArea: values[0], 
      maxArea: values[1] 
    });
  };

  return (
    <div className="w-80 border-r border-border bg-card">
      <Card className="border-0 shadow-none">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 p-6">
          {/* Búsqueda */}
          <div className="space-y-2">
            <Label>Búsqueda</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por título..."
                className="pl-9"
              />
            </div>
          </div>

          {/* Tipo de propiedad */}
          <div className="space-y-2">
            <Label>Tipo de Propiedad</Label>
            <Select
              value={filters.type || "all"}
              onValueChange={(value) => handleFilterChange('type', value === 'all' ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                {propertyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Estado */}
          <div className="space-y-2">
            <Label>Estado</Label>
            <Select
              value={filters.status || "all"}
              onValueChange={(value) => handleFilterChange('status', value === 'all' ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                {propertyStatus.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ciudad */}
          <div className="space-y-2">
            <Label>Ciudad</Label>
            <Select
              value={filters.city || "all"}
              onValueChange={(value) => handleFilterChange('city', value === 'all' ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar ciudad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las ciudades</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rango de precio */}
          <div className="space-y-4">
            <Label>Precio: €{priceRange[0].toLocaleString()} - €{priceRange[1].toLocaleString()}</Label>
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              min={0}
              max={1000000}
              step={10000}
              className="w-full"
            />
          </div>

          {/* Rango de área */}
          <div className="space-y-4">
            <Label>Área: {areaRange[0]}m² - {areaRange[1]}m²</Label>
            <Slider
              value={areaRange}
              onValueChange={handleAreaChange}
              min={0}
              max={500}
              step={10}
              className="w-full"
            />
          </div>

          {/* Habitaciones */}
          <div className="space-y-2">
            <Label>Habitaciones</Label>
            <Select
              value={filters.bedrooms?.toString() || "all"}
              onValueChange={(value) => handleFilterChange('bedrooms', value === 'all' ? undefined : parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Cualquier cantidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Cualquier cantidad</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Baños */}
          <div className="space-y-2">
            <Label>Baños</Label>
            <Select
              value={filters.bathrooms?.toString() || "all"}
              onValueChange={(value) => handleFilterChange('bathrooms', value === 'all' ? undefined : parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Cualquier cantidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Cualquier cantidad</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}