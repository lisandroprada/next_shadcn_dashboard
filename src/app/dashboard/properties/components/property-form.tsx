'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { IconTrash } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useBeforeUnload } from '@/hooks/use-before-unload';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { FileUploader } from '@/components/file-uploader';
import { useRouter } from 'next/navigation';

const propertyFormSchema = z.object({
  detailedDescription: z
    .object({
      title: z.string().optional(),
      brief: z.string().optional(),
      sqFt: z.coerce.number().optional(),
      buildSqFt: z.coerce.number().optional(),
      age: z.coerce.number().optional(),
      rooms: z.coerce.number().optional(),
      bedrooms: z.coerce.number().optional(),
      bathrooms: z.coerce.number().optional(),
      floors: z.coerce.number().optional(),
      orientation: z.string().optional(),
      petFriendly: z.boolean().default(false),
      availableServices: z.array(z.string()).optional()
    })
    .optional(),
  specs: z.array(z.string()).optional(),
  type: z.string().min(1, 'Type is required'),
  purpose: z.string().min(1, 'Purpose is required'),
  status: z.string().min(1, 'Status is required'),
  owners: z.array(z.string()).min(1, 'At least one owner is required'),
  tenant: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  province: z.string().min(1, 'Province is required'),
  locality: z.string().min(1, 'Locality is required'),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  valueForSale: z
    .object({
      amount: z.coerce.number().optional(),
      currency: z.string().optional(),
      pricePublic: z.boolean().default(false),
      paymentMethod: z.string().optional(),
      description: z.string().optional(),
      date: z.string().optional()
    })
    .optional(),
  valueForRent: z
    .object({
      amount: z.coerce.number().optional(),
      currency: z.string().optional(),
      pricePublic: z.boolean().default(false),
      paymentMethod: z.string().optional(),
      description: z.string().optional(),
      date: z.string().optional()
    })
    .optional(),
  publishForSale: z.boolean().default(false),
  publishForRent: z.boolean().default(false),
  available: z.boolean().default(true),
  availableAt: z.string().optional(),
  inventory: z
    .array(
      z.object({
        item: z.string().min(1, 'Item name is required'),
        quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
        room: z.string().optional(),
        condition: z.string().optional()
      })
    )
    .optional()
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

const propertyTypes = [
  'departamento',
  'casa',
  'ph',
  'oficina',
  'local_comercial',
  'galpon',
  'lote',
  'quinta',
  'chacra',
  'estudio',
  'loft',
  'duplex',
  'triplex'
];

const propertyPurposes = ['residencial', 'comercial', 'industrial'];
const propertyStatuses = [
  'disponible',
  'alquilado',
  'vendido',
  'reservado',
  'no disponible'
];

interface PropertyFormProps {
  initialData: any | null;
}

const LocationMap = ({ onLocationChange }: { onLocationChange: (location: { lat: number; lng: number; address: string }) => void }) => {
  // Placeholder component
  return (
    <div className="p-4 border rounded-md">
      <p>Location Map Placeholder</p>
    </div>
  );
};

const CompletionReportCard = ({ formData }: { formData: any }) => {
  // Placeholder component
  return (
    <div className="p-4 border rounded-md">
      <p>Completion Report Card Placeholder</p>
    </div>
  );
};

const createProperty = async (data: PropertyFormValues) => {
  const response = await fetch('/api/v1/property', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

const updateProperty = async (id: string, data: PropertyFormValues) => {
  const response = await fetch(`/api/v1/property/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );
  return response.json();
};

export default function PropertyForm({ initialData }: PropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [owners, setOwners] = useState([]);
  const [specs, setSpecs] = useState([]);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await fetch('/api/v1/party/search/owners');
        const data = await response.json();
        setOwners(data);
      } catch (error) {
        console.error('Error fetching owners:', error);
      }
    };

    const fetchSpecs = async () => {
      try {
        const response = await fetch('/api/v1/specs');
        const data = await response.json();
        setSpecs(data);
      } catch (error) {
        console.error('Error fetching specs:', error);
      }
    };

    fetchOwners();
    fetchSpecs();
  }, []);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: initialData || {
      detailedDescription: {
        title: '',
        brief: '',
        petFriendly: false
      },
      type: '',
      purpose: '',
      status: 'disponible',
      owners: [],
      tenant: '',
      address: '',
      province: '',
      locality: '',
      valueForSale: {
        pricePublic: false
      },
      valueForRent: {
        pricePublic: false
      },
      publishForSale: false,
      publishForRent: false,
      available: true,
      inventory: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'inventory'
  });

  const { formState } = form;
  const watchedData = form.watch();
  useBeforeUnload(formState.isDirty);

  const onSubmit = async (data: PropertyFormValues) => {
    try {
      setLoading(true);
      if (initialData && initialData._id) {
        await updateProperty(initialData._id, data);
      } else {
        const response = await createProperty(data);
        router.push(`/dashboard/properties/${response._id}/edit`);
      }
      toast.success(initialData ? 'Property updated' : 'Property created', {
        description: 'The property has been saved successfully.'
      });
    } catch (error) {
      toast.error('Uh oh! Something went wrong.', {
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='flex items-center justify-between'>
          <Button type='submit' disabled={loading}>
            {initialData ? 'Save changes' : 'Create property'}
          </Button>
        </div>
        <Separator />
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <Tabs defaultValue='general' className='w-full'>
              <TabsList>
                <TabsTrigger value='general'>Información General</TabsTrigger>
                <TabsTrigger value='location'>Ubicación</TabsTrigger>
                <TabsTrigger value='details'>Detalles</TabsTrigger>
                <TabsTrigger value='values'>Valores y Publicación</TabsTrigger>
                <TabsTrigger value='media'>Multimedia</TabsTrigger>
                <TabsTrigger value='inventory'>Inventario</TabsTrigger>
              </TabsList>
              <TabsContent value='general' className='mt-4'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='detailedDescription.title'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='e.g. Modern Apartment in the City Center'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='detailedDescription.brief'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brief Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='A short summary of the property...'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='type'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select a property type' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {propertyTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='purpose'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purpose</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select a purpose' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {propertyPurposes.map((purpose) => (
                              <SelectItem key={purpose} value={purpose}>
                                {purpose}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select a status' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {propertyStatuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='owners'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Owners</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Comma-separated owner IDs'
                            value={Array.isArray(field.value) ? field.value.join(',') : ''}
                            onChange={(e) =>
                              field.onChange(e.target.value.split(',').map(s => s.trim()))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='tenant'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tenant</FormLabel>
                        <FormControl>
                          <Input placeholder='Tenant ID' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value='location' className='mt-4'>
                <p className='text-muted-foreground text-sm'>
                  Search for an address or drag the marker to set the location.
                  Remember to set your{' '}
                  <code className='bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm'>
                    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                  </code>{' '}
                  in your environment variables.
                </p>
                <LocationMap
                  onLocationChange={({ lat, lng, address }) => {
                    form.setValue('lat', lat);
                    form.setValue('lng', lng);
                    form.setValue('address', address);
                  }}
                />
                <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='lat'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='e.g. -34.6037'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='lng'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='e.g. -58.3816'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value='details' className='mt-4'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <FormField
                    control={form.control}
                    name='detailedDescription.sqFt'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Square Feet</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='e.g. 100'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='detailedDescription.buildSqFt'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Built Square Feet</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='e.g. 80'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='detailedDescription.age'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age of Property</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='e.g. 5'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='detailedDescription.rooms'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rooms</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='e.g. 3'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='detailedDescription.bedrooms'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='e.g. 2'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='detailedDescription.bathrooms'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='e.g. 1'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='detailedDescription.floors'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Floors</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='e.g. 1'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='detailedDescription.orientation'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Orientation</FormLabel>
                        <FormControl>
                          <Input placeholder='e.g. North' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='detailedDescription.petFriendly'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                        <div className='space-y-0.5'>
                          <FormLabel className='text-base'>
                            Pet Friendly
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='specs'
                    render={({ field }) => (
                      <FormItem className='md:col-span-3'>
                        <FormLabel>Specs</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Comma-separated specs (e.g. pool, gym)'
                            value={Array.isArray(field.value) ? field.value.join(',') : ''}
                            onChange={(e) =>
                              field.onChange(e.target.value.split(',').map(s => s.trim()))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='detailedDescription.availableServices'
                    render={({ field }) => (
                      <FormItem className='md:col-span-3'>
                        <FormLabel>Available Services</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Comma-separated services (e.g. wifi, cable tv)'
                            value={Array.isArray(field.value) ? field.value.join(',') : ''}
                            onChange={(e) =>
                              field.onChange(e.target.value.split(',').map(s => s.trim()))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value='values' className='mt-4'>
                <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                  <div className='space-y-4 rounded-lg border p-4'>
                    <h3 className='text-lg font-medium'>For Sale</h3>
                    <FormField
                      control={form.control}
                      name='valueForSale.amount'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sale Price</FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder='e.g. 250000'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='valueForSale.currency'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <FormControl>
                            <Input placeholder='e.g. USD' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='publishForSale'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                          <div className='space-y-0.5'>
                            <FormLabel className='text-base'>
                              Publish For Sale
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='space-y-4 rounded-lg border p-4'>
                    <h3 className='text-lg font-medium'>For Rent</h3>
                    <FormField
                      control={form.control}
                      name='valueForRent.amount'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rent Price</FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder='e.g. 1200'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='valueForRent.currency'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <FormControl>
                            <Input placeholder='e.g. ARS' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='publishForRent'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                          <div className='space-y-0.5'>
                            <FormLabel className='text-base'>
                              Publish For Rent
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='space-y-4 rounded-lg border p-4 md:col-span-2'>
                    <FormField
                      control={form.control}
                      name='available'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                          <div className='space-y-0.5'>
                            <FormLabel className='text-base'>
                              Available
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='availableAt'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Available At</FormLabel>
                          <FormControl>
                            <Input type='date' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value='media' className='mt-4 space-y-8'>
                <div>
                  <h3 className='mb-2 text-lg font-medium'>Property Photos</h3>
                  <FileUploader
                    accept={{ 'image/*': [] }}
                    multiple
                    maxFiles={10}
                    onUpload={(files) => {
                      // TODO: Implement upload to /api/v1/property/:id/images
                      console.log('Uploading photos:', files);
                      return new Promise((res) => setTimeout(res, 2000));
                    }}
                  />
                </div>
                <div>
                  <h3 className='mb-2 text-lg font-medium'>
                    Floor Plans (Images)
                  </h3>
                  <FileUploader
                    accept={{
                      'image/jpeg': [],
                      'image/png': [],
                      'image/webp': []
                    }}
                    multiple
                    onUpload={(files) => {
                      // TODO: Implement upload to /api/v1/property/:id/floor-plans
                      console.log('Uploading floor plans:', files);
                      return new Promise((res) => setTimeout(res, 2000));
                    }}
                  />
                </div>
                <div>
                  <h3 className='mb-2 text-lg font-medium'>
                    Documents (PDF, DOC, etc.)
                  </h3>
                  <FileUploader
                    accept={{
                      'application/pdf': [],
                      'application/msword': [],
                      'application/vnd.ms-excel': []
                    }}
                    multiple
                    onUpload={(files) => {
                      // TODO: Implement upload to /api/v1/property/:id/documents
                      console.log('Uploading documents:', files);
                      return new Promise((res) => setTimeout(res, 2000));
                    }}
                  />
                </div>
              </TabsContent>

              <TabsContent value='inventory' className='mt-4'>
                <div>
                  <h3 className='mb-4 text-lg font-medium'>Inventory</h3>
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className='mb-4 flex items-center gap-4 rounded-lg border p-4'
                    >
                      <FormField
                        control={form.control}
                        name={`inventory.${index}.item`}
                        render={({ field }) => (
                          <FormItem className='flex-1'>
                            <FormLabel>Item</FormLabel>
                            <FormControl>
                              <Input placeholder='e.g. Chair' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`inventory.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input type='number' placeholder='1' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`inventory.${index}.room`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Room</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='e.g. Living Room'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`inventory.${index}.condition`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Condition</FormLabel>
                            <FormControl>
                              <Input placeholder='e.g. New' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        onClick={() => remove(index)}
                        className='self-end'
                      >
                        <IconTrash className='text-destructive h-5 w-5' />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() =>
                      append({ item: '', quantity: 1, room: '', condition: '' })
                    }
                  >
                    Add Inventory Item
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <CompletionReportCard formData={watchedData} />
          </div>
        </div>
      </form>
    </Form>
  );
}