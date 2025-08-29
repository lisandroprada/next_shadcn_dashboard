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
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Property } from '@/types/property.schema';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface PropertyDetailsTabProps {
  property: Partial<Property>;
  onPropertyChange: (field: keyof Property, value: any) => void;
}

export function PropertyDetailsTab({
  property,
  onPropertyChange
}: PropertyDetailsTabProps) {
  const [newSpec, setNewSpec] = useState('');

  const updateDetailedDescription = (field: string, value: any) => {
    const currentDetails = property.detailedDescription || {};
    onPropertyChange('detailedDescription', {
      ...currentDetails,
      [field]: value
    });
  };

  const updateAvailableServices = (services: string[]) => {
    updateDetailedDescription('availableServices', services);
  };

  const addSpec = () => {
    if (newSpec.trim()) {
      const specs = [...(property.specs || []), newSpec.trim()];
      onPropertyChange('specs', specs);
      setNewSpec('');
    }
  };

  const removeSpec = (index: number) => {
    const specs = (property.specs || []).filter((_, i) => i !== index);
    onPropertyChange('specs', specs);
  };

  const availableServices = [
    'WiFi',
    'Cable/Satelital',
    'Gas Natural',
    'Aire Acondicionado',
    'Calefacción',
    'Seguridad 24hs',
    'Portero',
    'Ascensor',
    'Cochera',
    'Pileta',
    'Gimnasio',
    'Parrilla'
  ];

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <Label htmlFor='title'>Título de la propiedad</Label>
            <Input
              id='title'
              value={property.detailedDescription?.title || ''}
              onChange={(e) =>
                updateDetailedDescription('title', e.target.value)
              }
              placeholder='Ej: Hermoso departamento con vista al mar'
            />
          </div>

          <div>
            <Label htmlFor='brief'>Descripción breve</Label>
            <Textarea
              id='brief'
              value={property.detailedDescription?.brief || ''}
              onChange={(e) =>
                updateDetailedDescription('brief', e.target.value)
              }
              placeholder='Descripción corta que destaque las características principales'
            />
          </div>

          <div>
            <Label htmlFor='expensesType'>Tipo de expensas</Label>
            <Select
              value={property.expensesType || ''}
              onValueChange={(value) => onPropertyChange('expensesType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Seleccionar tipo' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='included'>Incluidas</SelectItem>
                <SelectItem value='separate'>Por separado</SelectItem>
                <SelectItem value='none'>Sin expensas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medidas y Ambientes</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='sqFt'>Superficie total (m²)</Label>
              <Input
                id='sqFt'
                type='number'
                value={property.detailedDescription?.sqFt || ''}
                onChange={(e) =>
                  updateDetailedDescription(
                    'sqFt',
                    parseFloat(e.target.value) || undefined
                  )
                }
                placeholder='0'
              />
            </div>
            <div>
              <Label htmlFor='buildSqFt'>Superficie cubierta (m²)</Label>
              <Input
                id='buildSqFt'
                type='number'
                value={property.detailedDescription?.buildSqFt || ''}
                onChange={(e) =>
                  updateDetailedDescription(
                    'buildSqFt',
                    parseFloat(e.target.value) || undefined
                  )
                }
                placeholder='0'
              />
            </div>
          </div>

          <div className='grid grid-cols-4 gap-4'>
            <div>
              <Label htmlFor='rooms'>Ambientes</Label>
              <Input
                id='rooms'
                type='number'
                value={property.detailedDescription?.rooms || ''}
                onChange={(e) =>
                  updateDetailedDescription(
                    'rooms',
                    parseInt(e.target.value) || undefined
                  )
                }
                placeholder='0'
              />
            </div>
            <div>
              <Label htmlFor='bedrooms'>Dormitorios</Label>
              <Input
                id='bedrooms'
                type='number'
                value={property.detailedDescription?.bedrooms || ''}
                onChange={(e) =>
                  updateDetailedDescription(
                    'bedrooms',
                    parseInt(e.target.value) || undefined
                  )
                }
                placeholder='0'
              />
            </div>
            <div>
              <Label htmlFor='bathrooms'>Baños</Label>
              <Input
                id='bathrooms'
                type='number'
                value={property.detailedDescription?.bathrooms || ''}
                onChange={(e) =>
                  updateDetailedDescription(
                    'bathrooms',
                    parseInt(e.target.value) || undefined
                  )
                }
                placeholder='0'
              />
            </div>
            <div>
              <Label htmlFor='floors'>Pisos</Label>
              <Input
                id='floors'
                type='number'
                value={property.detailedDescription?.floors || ''}
                onChange={(e) =>
                  updateDetailedDescription(
                    'floors',
                    parseInt(e.target.value) || undefined
                  )
                }
                placeholder='0'
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='age'>Antigüedad (años)</Label>
              <Input
                id='age'
                type='number'
                value={property.detailedDescription?.age || ''}
                onChange={(e) =>
                  updateDetailedDescription(
                    'age',
                    parseInt(e.target.value) || undefined
                  )
                }
                placeholder='0'
              />
            </div>
            <div>
              <Label htmlFor='orientation'>Orientación</Label>
              <Select
                value={property.detailedDescription?.orientation || ''}
                onValueChange={(value) =>
                  updateDetailedDescription('orientation', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Seleccionar orientación' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='north'>Norte</SelectItem>
                  <SelectItem value='south'>Sur</SelectItem>
                  <SelectItem value='east'>Este</SelectItem>
                  <SelectItem value='west'>Oeste</SelectItem>
                  <SelectItem value='northeast'>Noreste</SelectItem>
                  <SelectItem value='northwest'>Noroeste</SelectItem>
                  <SelectItem value='southeast'>Sureste</SelectItem>
                  <SelectItem value='southwest'>Suroeste</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='flex items-center space-x-2'>
            <Checkbox
              id='petFriendly'
              checked={property.detailedDescription?.petFriendly || false}
              onCheckedChange={(checked) =>
                updateDetailedDescription('petFriendly', checked)
              }
            />
            <Label htmlFor='petFriendly'>Acepta mascotas</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Servicios Disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-3 gap-2'>
            {availableServices.map((service) => (
              <div key={service} className='flex items-center space-x-2'>
                <Checkbox
                  id={service}
                  checked={
                    property.detailedDescription?.availableServices?.includes(
                      service
                    ) || false
                  }
                  onCheckedChange={(checked) => {
                    const currentServices =
                      property.detailedDescription?.availableServices || [];
                    if (checked) {
                      updateAvailableServices([...currentServices, service]);
                    } else {
                      updateAvailableServices(
                        currentServices.filter((s) => s !== service)
                      );
                    }
                  }}
                />
                <Label htmlFor={service} className='text-sm'>
                  {service}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Especificaciones Adicionales</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex gap-2'>
            <Input
              value={newSpec}
              onChange={(e) => setNewSpec(e.target.value)}
              placeholder='Agregar especificación'
              onKeyPress={(e) => e.key === 'Enter' && addSpec()}
            />
            <Button onClick={addSpec} size='sm'>
              <Plus className='h-4 w-4' />
            </Button>
          </div>

          <div className='flex flex-wrap gap-2'>
            {property.specs?.map((spec, index) => (
              <Badge
                key={index}
                variant='secondary'
                className='flex items-center gap-2'
              >
                {spec}
                <button
                  onClick={() => removeSpec(index)}
                  className='text-muted-foreground hover:text-destructive'
                >
                  <X className='h-3 w-3' />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
