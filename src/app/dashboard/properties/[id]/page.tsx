'use client';

import { useProperty } from '../hooks/use-property';

export default function PropertyPage({ params }: { params: { id: string } }) {
  const { property, loading } = useProperty(params.id);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <div>
      <h1>{property.address}</h1>
      <p>Type: {property.type}</p>
      <p>Purpose: {property.purpose}</p>
      <p>Status: {property.status}</p>
    </div>
  );
}
