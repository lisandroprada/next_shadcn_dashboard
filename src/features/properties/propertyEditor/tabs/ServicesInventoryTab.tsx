import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Property } from '@/types/property.schema';
import { Plus, X, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ServicesInventoryTabProps {
  property: Partial<Property>;
  onPropertyChange: (field: keyof Property, value: any) => void;
}

export function ServicesInventoryTab({
  property,
  onPropertyChange
}: ServicesInventoryTabProps) {
  const [newService, setNewService] = useState('');
  const [newInventoryItem, setNewInventoryItem] = useState({
    item: '',
    quantity: 1,
    room: '',
    condition: 'good'
  });

  const addService = () => {
    if (newService.trim()) {
      const services = [
        ...(property.associatedServices || []),
        newService.trim()
      ];
      onPropertyChange('associatedServices', services);
      setNewService('');
    }
  };

  const removeService = (index: number) => {
    const services = (property.associatedServices || []).filter(
      (_, i) => i !== index
    );
    onPropertyChange('associatedServices', services);
  };

  const addInventoryItem = () => {
    if (newInventoryItem.item.trim() && newInventoryItem.room.trim()) {
      const inventory = [
        ...(property.inventory || []),
        { ...newInventoryItem }
      ];
      onPropertyChange('inventory', inventory);
      setNewInventoryItem({
        item: '',
        quantity: 1,
        room: '',
        condition: 'good'
      });
    }
  };

  const updateInventoryItem = (index: number, field: string, value: any) => {
    const inventory = [...(property.inventory || [])];
    inventory[index] = { ...inventory[index], [field]: value };
    onPropertyChange('inventory', inventory);
  };

  const removeInventoryItem = (index: number) => {
    const inventory = (property.inventory || []).filter((_, i) => i !== index);
    onPropertyChange('inventory', inventory);
  };

  const availableServices = [
    'Limpieza',
    'Jardinería',
    'Mantenimiento',
    'Seguridad',
    'Administración',
    'Portería',
    'Cochera',
    'Lavandería'
  ];

  const roomOptions = [
    'Sala de estar',
    'Cocina',
    'Dormitorio principal',
    'Dormitorio secundario',
    'Baño principal',
    'Baño secundario',
    'Balcón',
    'Terraza',
    'Garaje',
    'Lavadero'
  ];

  const conditionOptions = [
    { value: 'excellent', label: 'Excelente' },
    { value: 'good', label: 'Bueno' },
    { value: 'fair', label: 'Regular' },
    { value: 'poor', label: 'Malo' }
  ];

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Servicios Asociados</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex gap-2'>
            <Select value={newService} onValueChange={setNewService}>
              <SelectTrigger className='flex-1'>
                <SelectValue placeholder='Seleccionar servicio' />
              </SelectTrigger>
              <SelectContent>
                {availableServices.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addService} size='sm' disabled={!newService}>
              <Plus className='h-4 w-4' />
            </Button>
          </div>

          <div className='flex flex-wrap gap-2'>
            {property.associatedServices?.map((service, index) => (
              <Badge
                key={index}
                variant='secondary'
                className='flex items-center gap-2'
              >
                {service}
                <button
                  onClick={() => removeService(index)}
                  className='text-muted-foreground hover:text-destructive'
                >
                  <X className='h-3 w-3' />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inventario</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='bg-muted/30 grid grid-cols-6 gap-2 rounded-lg p-4'>
            <div>
              <Label htmlFor='newItem'>Artículo</Label>
              <Input
                id='newItem'
                value={newInventoryItem.item}
                onChange={(e) =>
                  setNewInventoryItem((prev) => ({
                    ...prev,
                    item: e.target.value
                  }))
                }
                placeholder='Nombre del artículo'
              />
            </div>
            <div>
              <Label htmlFor='newQuantity'>Cantidad</Label>
              <Input
                id='newQuantity'
                type='number'
                min='1'
                value={newInventoryItem.quantity}
                onChange={(e) =>
                  setNewInventoryItem((prev) => ({
                    ...prev,
                    quantity: parseInt(e.target.value) || 1
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor='newRoom'>Ambiente</Label>
              <Select
                value={newInventoryItem.room}
                onValueChange={(value) =>
                  setNewInventoryItem((prev) => ({ ...prev, room: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Ambiente' />
                </SelectTrigger>
                <SelectContent>
                  {roomOptions.map((room) => (
                    <SelectItem key={room} value={room}>
                      {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor='newCondition'>Estado</Label>
              <Select
                value={newInventoryItem.condition}
                onValueChange={(value) =>
                  setNewInventoryItem((prev) => ({ ...prev, condition: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {conditionOptions.map((condition) => (
                    <SelectItem key={condition.value} value={condition.value}>
                      {condition.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex items-end'>
              <Button
                onClick={addInventoryItem}
                size='sm'
                disabled={
                  !newInventoryItem.item.trim() || !newInventoryItem.room
                }
                className='w-full'
              >
                <Plus className='h-4 w-4' />
              </Button>
            </div>
          </div>

          <div className='space-y-2'>
            {property.inventory?.map((item, index) => (
              <div
                key={index}
                className='grid grid-cols-6 gap-2 rounded-lg border p-2'
              >
                <Input
                  value={item.item}
                  onChange={(e) =>
                    updateInventoryItem(index, 'item', e.target.value)
                  }
                  placeholder='Artículo'
                />
                <Input
                  type='number'
                  min='1'
                  value={item.quantity}
                  onChange={(e) =>
                    updateInventoryItem(
                      index,
                      'quantity',
                      parseInt(e.target.value) || 1
                    )
                  }
                />
                <Select
                  value={item.room}
                  onValueChange={(value) =>
                    updateInventoryItem(index, 'room', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roomOptions.map((room) => (
                      <SelectItem key={room} value={room}>
                        {room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={item.condition}
                  onValueChange={(value) =>
                    updateInventoryItem(index, 'condition', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditionOptions.map((condition) => (
                      <SelectItem key={condition.value} value={condition.value}>
                        {condition.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => removeInventoryItem(index)}
                  size='sm'
                  variant='outline'
                  className='w-full'
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            )) || (
              <div className='text-muted-foreground py-8 text-center'>
                No hay artículos en el inventario
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
