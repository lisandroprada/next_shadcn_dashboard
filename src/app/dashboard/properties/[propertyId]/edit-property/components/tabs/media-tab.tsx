
import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FileUploader } from '@/components/file-uploader';

export function MediaTab() {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="images"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Images</FormLabel>
            <FormControl>
              <FileUploader {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="floorPlans"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Floor Plans</FormLabel>
            <FormControl>
              <FileUploader {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="documents"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Documents</FormLabel>
            <FormControl>
              <FileUploader {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
