
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function InventoryTab() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'inventory'
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-4">
          <FormField
            control={control}
            name={`inventory.${index}.item`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`inventory.${index}.quantity`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`inventory.${index}.room`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`inventory.${index}.condition`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condition</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" variant="destructive" onClick={() => remove(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => append({ item: '', quantity: 1, room: '', condition: '' })}
      >
        Add Inventory Item
      </Button>
    </div>
  );
}
