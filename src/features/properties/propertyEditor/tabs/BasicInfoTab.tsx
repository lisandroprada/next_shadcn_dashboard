import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Property } from '@/types/property.schema';

interface BasicInfoTabProps {
  property: Partial<Property>;
  onPropertyChange: (field: keyof Property, value: any) => void;
}

export function BasicInfoTab({
  property,
  onPropertyChange
}: BasicInfoTabProps) {
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Ubicación</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <Label htmlFor='address'>Dirección</Label>
            <Input
              id='address'
              value={property.address || ''}
              onChange={(e) => onPropertyChange('address', e.target.value)}
              placeholder='Ingrese la dirección completa'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='province'>Provincia</Label>
              <Select
                value={property.province || ''}
                onValueChange={(value) => onPropertyChange('province', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Seleccionar provincia' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='buenos-aires'>Buenos Aires</SelectItem>
                  <SelectItem value='cordoba'>Córdoba</SelectItem>
                  <SelectItem value='santa-fe'>Santa Fe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor='locality'>Localidad</Label>
              <Select
                value={property.locality || ''}
                onValueChange={(value) => onPropertyChange('locality', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Seleccionar localidad' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='caba'>CABA</SelectItem>
                  <SelectItem value='la-plata'>La Plata</SelectItem>
                  <SelectItem value='rosario'>Rosario</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='lat'>Latitud</Label>
              <Input
                id='lat'
                type='number'
                step='any'
                value={property.lat || ''}
                onChange={(e) =>
                  onPropertyChange(
                    'lat',
                    parseFloat(e.target.value) || undefined
                  )
                }
                placeholder='-34.6037'
              />
            </div>
            <div>
              <Label htmlFor='lng'>Longitud</Label>
              <Input
                id='lng'
                type='number'
                step='any'
                value={property.lng || ''}
                onChange={(e) =>
                  onPropertyChange(
                    'lng',
                    parseFloat(e.target.value) || undefined
                  )
                }
                placeholder='-58.3816'
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información General</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='type'>Tipo de propiedad</Label>
              <Select
                value={property.type || ''}
                onValueChange={(value) => onPropertyChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Seleccionar tipo' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='house'>Casa</SelectItem>
                  <SelectItem value='apartment'>Departamento</SelectItem>
                  <SelectItem value='office'>Oficina</SelectItem>
                  <SelectItem value='commercial'>Local comercial</SelectItem>
                  <SelectItem value='land'>Terreno</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor='purpose'>Finalidad</Label>
              <Select
                value={property.purpose || ''}
                onValueChange={(value) => onPropertyChange('purpose', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Seleccionar finalidad' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='rent'>Alquiler</SelectItem>
                  <SelectItem value='sale'>Venta</SelectItem>
                  <SelectItem value='both'>Ambos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='status'>Estado</Label>
              <Select
                value={property.status || ''}
                onValueChange={(value) => onPropertyChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Seleccionar estado' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='available'>Disponible</SelectItem>
                  <SelectItem value='occupied'>Ocupada</SelectItem>
                  <SelectItem value='maintenance'>Mantenimiento</SelectItem>
                  <SelectItem value='reserved'>Reservada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor='consortium'>Consorcio</Label>
              <Input
                id='consortium'
                value={property.consortium || ''}
                onChange={(e) => onPropertyChange('consortium', e.target.value)}
                placeholder='Nombre del consorcio'
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
