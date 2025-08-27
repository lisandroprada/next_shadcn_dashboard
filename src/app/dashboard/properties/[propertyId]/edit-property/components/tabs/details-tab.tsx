
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

export function DetailsTab() {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="detailedDescription.title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Modern Apartment in the City Center" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="detailedDescription.brief"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brief Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="A brief description of the property."
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="detailedDescription.sqFt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Square Feet</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 120" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="detailedDescription.buildSqFt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Built Square Feet</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="detailedDescription.age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age of Property</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="detailedDescription.rooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rooms</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="detailedDescription.bedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bedrooms</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="detailedDescription.bathrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bathrooms</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="detailedDescription.floors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Floors</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="detailedDescription.orientation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Orientation</FormLabel>
              <FormControl>
                <Input placeholder="e.g. North" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="detailedDescription.petFriendly"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Pet Friendly
              </FormLabel>
              <FormDescription>
                Are pets allowed in this property?
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
