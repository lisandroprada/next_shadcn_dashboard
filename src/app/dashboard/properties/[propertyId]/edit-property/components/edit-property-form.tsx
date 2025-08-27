'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeneralTab } from './tabs/general-tab';
import { FinancialTab } from './tabs/financial-tab';
import { DetailsTab } from './tabs/details-tab';
import { MediaTab } from './tabs/media-tab';
import { RelationsTab } from './tabs/relations-tab';
import { InventoryTab } from './tabs/inventory-tab';
import { useDebounce } from '@/hooks/use-debounce';
import { useBeforeUnload } from '@/hooks/use-before-unload';
import { CompletionProgress } from './completion-progress';
import {
  getProperty,
  updateProperty
} from '@/features/properties/services/property-service';

const formSchema = z.object({
  address: z.string().min(2, {
    message: 'Address must be at least 2 characters.'
  }),
  type: z.string().min(2, {
    message: 'Type must be at least 2 characters.'
  }),
  purpose: z.string().min(2, {
    message: 'Purpose must be at least 2 characters.'
  }),
  status: z.string().min(2, {
    message: 'Status must be at least 2 characters.'
  }),
  available: z.boolean(),
  valueForSale: z
    .object({
      amount: z.number().optional(),
      currency: z.string().optional(),
      pricePublic: z.boolean().optional()
    })
    .optional(),
  valueForRent: z
    .object({
      amount: z.number().optional(),
      currency: z.string().optional(),
      pricePublic: z.boolean().optional()
    })
    .optional(),
  detailedDescription: z
    .object({
      title: z.string().optional(),
      brief: z.string().optional(),
      sqFt: z.number().optional(),
      buildSqFt: z.number().optional(),
      age: z.number().optional(),
      rooms: z.number().optional(),
      bedrooms: z.number().optional(),
      bathrooms: z.number().optional(),
      floors: z.number().optional(),
      orientation: z.string().optional(),
      petFriendly: z.boolean().optional()
    })
    .optional(),
  images: z.any().optional(),
  floorPlans: z.any().optional(),
  documents: z.any().optional(),
  owners: z.array(z.string()).optional(),
  tenant: z.string().optional(),
  inventory: z
    .array(
      z.object({
        item: z.string(),
        quantity: z.number(),
        room: z.string(),
        condition: z.string()
      })
    )
    .optional()
});

export function EditPropertyForm({ propertyId }: { propertyId: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      type: '',
      purpose: '',
      status: '',
      available: false,
      valueForSale: {
        amount: 0,
        currency: 'USD',
        pricePublic: false
      },
      valueForRent: {
        amount: 0,
        currency: 'USD',
        pricePublic: false
      },
      detailedDescription: {
        title: '',
        brief: '',
        sqFt: 0,
        buildSqFt: 0,
        age: 0,
        rooms: 0,
        bedrooms: 0,
        bathrooms: 0,
        floors: 0,
        orientation: '',
        petFriendly: false
      },
      images: [],
      floorPlans: [],
      documents: [],
      owners: [],
      tenant: '',
      inventory: []
    }
  });

  const {
    formState: { isDirty }
  } = form;
  useBeforeUnload(isDirty);

  const watchedValues = form.watch();
  const debouncedValues = useDebounce(watchedValues, 1000);

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      // Transform owners from string[] to array of {_id: string}
      const owners = Array.isArray(values.owners)
        ? values.owners.map((id) => ({ _id: id }))
        : [];
      await updateProperty(propertyId, { ...values, owners });
    },
    [propertyId]
  );

  useEffect(() => {
    if (debouncedValues && isDirty) {
      onSubmit(debouncedValues);
    }
  }, [debouncedValues, isDirty, onSubmit]);

  useEffect(() => {
    const fetchProperty = async () => {
      const property = await getProperty(propertyId);
      // Transformar owners a string[] si es array de objetos
      const owners = Array.isArray(property.owners)
        ? property.owners
            .map((o: any) => (typeof o === 'string' ? o : o?._id))
            .filter(Boolean)
        : [];
      form.reset({ ...property, owners });
    };
    fetchProperty();
  }, [propertyId, form]);

  return (
    <div className='flex'>
      <div className='flex-1'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <Tabs defaultValue='general' className='w-full'>
              <TabsList>
                <TabsTrigger value='general'>General</TabsTrigger>
                <TabsTrigger value='financial'>Financial</TabsTrigger>
                <TabsTrigger value='details'>Details</TabsTrigger>
                <TabsTrigger value='media'>Media</TabsTrigger>
                <TabsTrigger value='relations'>Relations</TabsTrigger>
                <TabsTrigger value='inventory'>Inventory</TabsTrigger>
              </TabsList>
              <TabsContent value='general'>
                <GeneralTab />
              </TabsContent>
              <TabsContent value='financial'>
                <FinancialTab />
              </TabsContent>
              <TabsContent value='details'>
                <DetailsTab />
              </TabsContent>
              <TabsContent value='media'>
                <MediaTab />
              </TabsContent>
              <TabsContent value='relations'>
                <RelationsTab />
              </TabsContent>
              <TabsContent value='inventory'>
                <InventoryTab />
              </TabsContent>
            </Tabs>
            <Button type='submit'>Save Changes</Button>
          </form>
        </Form>
      </div>
      <div className='w-1/4 pl-8'>
        <div className='sticky top-0'>
          <CompletionProgress />
        </div>
      </div>
    </div>
  );
}
