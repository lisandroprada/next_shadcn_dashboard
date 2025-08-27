import { EditPropertyForm } from './components/edit-property-form';

// Use 'any' for params to avoid Next.js type mismatch
export default function EditPropertyPage({ params }: { params: any }) {
  return (
    <div>
      <h1 className='mb-4 text-2xl font-semibold'>Edit Property</h1>
      <EditPropertyForm propertyId={params.propertyId} />
    </div>
  );
}
