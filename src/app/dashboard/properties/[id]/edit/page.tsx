'use client';

import PropertyForm from '../components/property-form';
import { useProperty } from '../hooks/use-property';

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  const { property, loading } = useProperty(params.id);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <PropertyForm initialData={property} />;
}
