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
import { Property } from '@/types/property.schema';

interface PricingAvailabilityTabProps {
  property: Partial<Property>;
  onPropertyChange: (field: keyof Property, value: any) => void;
}

export function PricingAvailabilityTab({
  property,
  onPropertyChange
}: PricingAvailabilityTabProps) {
  const updateSaleValue = (field: string, value: any) => {
    const currentValue = property.valueForSale || {};
    onPropertyChange('valueForSale', { ...currentValue, [field]: value });
  };

  const updateRentValue = (field: string, value: any) => {
    const currentValue = property.valueForRent || {};
    onPropertyChange('valueForRent', { ...currentValue, [field]: value });
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Disponibilidad</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='available'
              checked={property.available || false}
              onCheckedChange={(checked) =>
                onPropertyChange('available', checked)
              }
            />
            <Label htmlFor='available'>Disponible</Label>
          </div>

          <div className='grid grid-cols-3 gap-4'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='availableForSale'
                checked={property.availableForSale || false}
                onCheckedChange={(checked) =>
                  onPropertyChange('availableForSale', checked)
                }
              />
              <Label htmlFor='availableForSale'>Disponible para venta</Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='publishForRent'
                checked={property.publishForRent || false}
                onCheckedChange={(checked) =>
                  onPropertyChange('publishForRent', checked)
                }
              />
              <Label htmlFor='publishForRent'>Publicar para alquiler</Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='publishForSale'
                checked={property.publishForSale || false}
                onCheckedChange={(checked) =>
                  onPropertyChange('publishForSale', checked)
                }
              />
              <Label htmlFor='publishForSale'>Publicar para venta</Label>
            </div>
          </div>

          <div>
            <Label htmlFor='availableAt'>Disponible desde</Label>
            <Input
              id='availableAt'
              type='date'
              value={
                property.availableAt
                  ? new Date(property.availableAt).toISOString().split('T')[0]
                  : ''
              }
              onChange={(e) =>
                onPropertyChange(
                  'availableAt',
                  e.target.value ? new Date(e.target.value) : undefined
                )
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Precio de Venta</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='saleAmount'>Monto</Label>
              <Input
                id='saleAmount'
                type='number'
                value={property.valueForSale?.amount || ''}
                onChange={(e) =>
                  updateSaleValue('amount', parseFloat(e.target.value) || 0)
                }
                placeholder='0'
              />
            </div>
            <div>
              <Label htmlFor='saleCurrency'>Moneda</Label>
              <Select
                value={property.valueForSale?.currency || ''}
                onValueChange={(value) => updateSaleValue('currency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Moneda' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='USD'>USD</SelectItem>
                  <SelectItem value='ARS'>ARS</SelectItem>
                  <SelectItem value='EUR'>EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='salePaymentMethod'>Método de pago</Label>
              <Select
                value={property.valueForSale?.paymentMethod || ''}
                onValueChange={(value) =>
                  updateSaleValue('paymentMethod', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Método' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='cash'>Efectivo</SelectItem>
                  <SelectItem value='mortgage'>Hipoteca</SelectItem>
                  <SelectItem value='financing'>Financiación</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='mt-6 flex items-center space-x-2'>
              <Checkbox
                id='salePricePublic'
                checked={property.valueForSale?.pricePublic || false}
                onCheckedChange={(checked) =>
                  updateSaleValue('pricePublic', checked)
                }
              />
              <Label htmlFor='salePricePublic'>Precio público</Label>
            </div>
          </div>

          <div>
            <Label htmlFor='saleDescription'>Descripción del precio</Label>
            <Textarea
              id='saleDescription'
              value={property.valueForSale?.description || ''}
              onChange={(e) => updateSaleValue('description', e.target.value)}
              placeholder='Detalles adicionales del precio'
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Precio de Alquiler</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='rentAmount'>Monto mensual</Label>
              <Input
                id='rentAmount'
                type='number'
                value={property.valueForRent?.amount || ''}
                onChange={(e) =>
                  updateRentValue('amount', parseFloat(e.target.value) || 0)
                }
                placeholder='0'
              />
            </div>
            <div>
              <Label htmlFor='rentCurrency'>Moneda</Label>
              <Select
                value={property.valueForRent?.currency || ''}
                onValueChange={(value) => updateRentValue('currency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Moneda' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='USD'>USD</SelectItem>
                  <SelectItem value='ARS'>ARS</SelectItem>
                  <SelectItem value='EUR'>EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='rentPaymentMethod'>Método de pago</Label>
              <Select
                value={property.valueForRent?.paymentMethod || ''}
                onValueChange={(value) =>
                  updateRentValue('paymentMethod', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Método' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='monthly'>Mensual</SelectItem>
                  <SelectItem value='quarterly'>Trimestral</SelectItem>
                  <SelectItem value='annual'>Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='mt-6 flex items-center space-x-2'>
              <Checkbox
                id='rentPricePublic'
                checked={property.valueForRent?.pricePublic || false}
                onCheckedChange={(checked) =>
                  updateRentValue('pricePublic', checked)
                }
              />
              <Label htmlFor='rentPricePublic'>Precio público</Label>
            </div>
          </div>

          <div>
            <Label htmlFor='rentDescription'>Descripción del precio</Label>
            <Textarea
              id='rentDescription'
              value={property.valueForRent?.description || ''}
              onChange={(e) => updateRentValue('description', e.target.value)}
              placeholder='Detalles adicionales del precio'
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
