
import { useFormContext } from 'react-hook-form';
import { Progress } from '@/components/ui/progress';

export function CompletionProgress() {
  const { watch } = useFormContext();
  const values = watch();

  const calculateCompletion = () => {
    const totalFields = 20; // Adjust this number based on the total number of fields
    let filledFields = 0;

    if (values.address) filledFields++;
    if (values.type) filledFields++;
    if (values.purpose) filledFields++;
    if (values.status) filledFields++;
    if (values.available) filledFields++;
    if (values.valueForSale?.amount) filledFields++;
    if (values.valueForSale?.currency) filledFields++;
    if (values.valueForRent?.amount) filledFields++;
    if (values.valueForRent?.currency) filledFields++;
    if (values.detailedDescription?.title) filledFields++;
    if (values.detailedDescription?.brief) filledFields++;
    if (values.detailedDescription?.sqFt) filledFields++;
    if (values.detailedDescription?.buildSqFt) filledFields++;
    if (values.detailedDescription?.age) filledFields++;
    if (values.detailedDescription?.rooms) filledFields++;
    if (values.detailedDescription?.bedrooms) filledFields++;
    if (values.detailedDescription?.bathrooms) filledFields++;
    if (values.detailedDescription?.floors) filledFields++;
    if (values.detailedDescription?.orientation) filledFields++;
    if (values.owners?.length > 0) filledFields++;

    return (filledFields / totalFields) * 100;
  };

  const completionPercentage = calculateCompletion();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Completion Progress</h3>
      <Progress value={completionPercentage} />
      <p className="text-sm text-muted-foreground mt-2">
        {Math.round(completionPercentage)}% complete
      </p>
    </div>
  );
}
