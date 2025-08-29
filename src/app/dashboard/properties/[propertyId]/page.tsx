'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Property } from '@/types/property.schema';
import { PropertyCompletenessCard } from '@/features/properties/propertyEditor/PropertyCompletenessCard';
import { BasicInfoTab } from '@/features/properties/propertyEditor/tabs/BasicInfoTab';
import { OwnersTenantsTab } from '@/features/properties/propertyEditor/tabs/OwnersTenantsTab';
import { PricingAvailabilityTab } from '@/features/properties/propertyEditor/tabs/PricingAvailabilityTab';
import { PropertyDetailsTab } from '@/features/properties/propertyEditor/tabs/PropertyDetailsTab';
import { ServicesInventoryTab } from '@/features/properties/propertyEditor/tabs/ServicesInventoryTab';
import { ImagesTab } from '@/features/properties/propertyEditor/tabs/ImagesTab';
import {
  Save,
  AlertCircle,
  Home,
  Users,
  DollarSign,
  Building,
  Wrench,
  Camera,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';

const PropertyEdit = () => {
  const [property, setProperty] = useState<Partial<Property>>({
    address: '',
    province: '',
    locality: '',
    owners: [],
    tenant: '',
    consortium: '',
    suppliers: [],
    specs: [],
    type: '',
    purpose: '',
    status: '',
    availableForSale: false,
    publishForRent: false,
    publishForSale: false,
    available: true,
    associatedServices: [],
    inventory: [],
    detailedDescription: {
      availableServices: [],
      petFriendly: false
    },
    expensesType: '',
    img: [],
    active: true,
    createdAt: new Date(),
    user: ''
  });

  const [originalProperty, setOriginalProperty] = useState<Partial<Property>>(
    {}
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Simulate loading initial property data
  useEffect(() => {
    // In a real app, this would fetch from an API
    const initialProperty = { ...property };
    setOriginalProperty(initialProperty);
  }, []);

  // Detect changes
  useEffect(() => {
    const hasChanges =
      JSON.stringify(property) !== JSON.stringify(originalProperty);
    setHasUnsavedChanges(hasChanges);
  }, [property, originalProperty]);

  const handlePropertyChange = (field: keyof Property, value: any) => {
    setProperty((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setOriginalProperty({ ...property });
      setHasUnsavedChanges(false);

      toast.success('Propiedad guardada', {
        description: 'Los cambios se han guardado correctamente.'
      });
    } catch (error) {
      toast.error('Error al guardar', {
        description: 'Ha ocurrido un error al guardar la propiedad.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscard = () => {
    setProperty({ ...originalProperty });
    setHasUnsavedChanges(false);
    toast('Cambios descartados', {
      description: 'Se han revertido todos los cambios no guardados.'
    });
  };

  const tabs = [
    { id: 'basic', label: 'Información Básica', icon: Home },
    { id: 'owners', label: 'Propietarios', icon: Users },
    { id: 'pricing', label: 'Precios', icon: DollarSign },
    { id: 'details', label: 'Detalles', icon: Building },
    { id: 'services', label: 'Servicios', icon: Wrench },
    { id: 'images', label: 'Imágenes', icon: Camera }
  ];

  return (
    <div className='bg-background min-h-screen'>
      <div className='bg-card border-b'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Button variant='ghost' size='sm'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Volver
              </Button>
              <div>
                <h1 className='text-2xl font-semibold'>
                  {property.address || 'Nueva Propiedad'}
                </h1>
                <p className='text-muted-foreground text-sm'>
                  Editar información de la propiedad
                </p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              {hasUnsavedChanges && (
                <>
                  <Button variant='outline' onClick={handleDiscard}>
                    Descartar
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className='mr-2 h-4 w-4' />
                    {isSaving ? 'Guardando...' : 'Guardar'}
                  </Button>
                </>
              )}
              <Badge variant={property.active ? 'default' : 'secondary'}>
                {property.active ? 'Activa' : 'Inactiva'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {hasUnsavedChanges && (
        <div className='border-b bg-orange-50/50 dark:bg-orange-950/50'>
          <div className='container mx-auto px-4 py-2'>
            <Alert className='border-orange-200'>
              <AlertCircle className='h-4 w-4' />
              <AlertDescription>
                Tienes cambios sin guardar. Recuerda guardar antes de salir.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}

      <div className='container mx-auto px-4 py-6'>
        <div className='flex gap-6'>
          <div className='flex-1'>
            <Tabs defaultValue='basic' className='space-y-6'>
              <TabsList className='grid w-full grid-cols-6'>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className='flex items-center gap-2'
                    >
                      <Icon className='h-4 w-4' />
                      <span className='hidden sm:inline'>{tab.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <TabsContent value='basic'>
                <BasicInfoTab
                  property={property}
                  onPropertyChange={handlePropertyChange}
                />
              </TabsContent>

              <TabsContent value='owners'>
                <OwnersTenantsTab
                  property={property}
                  onPropertyChange={handlePropertyChange}
                />
              </TabsContent>

              <TabsContent value='pricing'>
                <PricingAvailabilityTab
                  property={property}
                  onPropertyChange={handlePropertyChange}
                />
              </TabsContent>

              <TabsContent value='details'>
                <PropertyDetailsTab
                  property={property}
                  onPropertyChange={handlePropertyChange}
                />
              </TabsContent>

              <TabsContent value='services'>
                <ServicesInventoryTab
                  property={property}
                  onPropertyChange={handlePropertyChange}
                />
              </TabsContent>

              <TabsContent value='images'>
                <ImagesTab
                  property={property}
                  onPropertyChange={handlePropertyChange}
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className='w-80'>
            <PropertyCompletenessCard
              property={property}
              hasUnsavedChanges={hasUnsavedChanges}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyEdit;
