import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Property } from '@/types/property.schema';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface OwnersTenantsTabProps {
  property: Partial<Property>;
  onPropertyChange: (field: keyof Property, value: any) => void;
}

export function OwnersTenantsTab({
  property,
  onPropertyChange
}: OwnersTenantsTabProps) {
  const [newOwner, setNewOwner] = useState('');
  const [newSupplier, setNewSupplier] = useState('');

  const addOwner = () => {
    if (newOwner.trim()) {
      const owners = [...(property.owners || []), newOwner.trim()];
      onPropertyChange('owners', owners);
      setNewOwner('');
    }
  };

  const removeOwner = (index: number) => {
    const owners = (property.owners || []).filter((_, i) => i !== index);
    onPropertyChange('owners', owners);
  };

  const addSupplier = () => {
    if (newSupplier.trim()) {
      const suppliers = [...(property.suppliers || []), newSupplier.trim()];
      onPropertyChange('suppliers', suppliers);
      setNewSupplier('');
    }
  };

  const removeSupplier = (index: number) => {
    const suppliers = (property.suppliers || []).filter((_, i) => i !== index);
    onPropertyChange('suppliers', suppliers);
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Propietarios</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex gap-2'>
            <Input
              value={newOwner}
              onChange={(e) => setNewOwner(e.target.value)}
              placeholder='Nombre del propietario'
              onKeyPress={(e) => e.key === 'Enter' && addOwner()}
            />
            <Button onClick={addOwner} size='sm'>
              <Plus className='h-4 w-4' />
            </Button>
          </div>

          <div className='flex flex-wrap gap-2'>
            {property.owners?.map((owner, index) => (
              <Badge
                key={index}
                variant='secondary'
                className='flex items-center gap-2'
              >
                {owner}
                <button
                  onClick={() => removeOwner(index)}
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
          <CardTitle>Inquilino</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor='tenant'>Inquilino actual</Label>
            <Input
              id='tenant'
              value={property.tenant || ''}
              onChange={(e) => onPropertyChange('tenant', e.target.value)}
              placeholder='Nombre del inquilino'
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proveedores</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex gap-2'>
            <Input
              value={newSupplier}
              onChange={(e) => setNewSupplier(e.target.value)}
              placeholder='Nombre del proveedor'
              onKeyPress={(e) => e.key === 'Enter' && addSupplier()}
            />
            <Button onClick={addSupplier} size='sm'>
              <Plus className='h-4 w-4' />
            </Button>
          </div>

          <div className='flex flex-wrap gap-2'>
            {property.suppliers?.map((supplier, index) => (
              <Badge
                key={index}
                variant='secondary'
                className='flex items-center gap-2'
              >
                {supplier}
                <button
                  onClick={() => removeSupplier(index)}
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
