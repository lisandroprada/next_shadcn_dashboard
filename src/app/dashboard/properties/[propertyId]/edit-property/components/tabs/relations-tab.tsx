
import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function RelationsTab() {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="owners"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Owners</FormLabel>
            <FormControl>
              {/* TODO: Replace with a proper owner search component */}
              <Input placeholder="Search for owners..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="tenant"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tenant</FormLabel>
            <FormControl>
              {/* TODO: Replace with a proper tenant search component */}
              <Input placeholder="Search for a tenant..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
