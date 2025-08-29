'use client';
import { useState } from 'react';
import { PropertyFilters } from '@/features/properties/components/PropertyFilters';
import { PropertyViewToggle } from '@/features/properties/components/PropertyViewToggle';
import { PropertyCard } from '@/features/properties/components/PropertyCard';
import { PropertyList } from '@/features/properties/components/PropertyList';
import { PropertyMap } from '@/features/properties/components/PropertyMap';
import { PropertyPagination } from '@/features/properties/components/PropertyPagination';
import { ViewMode } from '@/types/property';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useProperties } from '@/hooks/useProperties';

const Properties = () => {
  const { properties, filters, setFilters, clearFilters, totalProperties } =
    useProperties();
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Pagination logic
  const totalPages = Math.ceil(totalProperties / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProperties = properties.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  const handlePropertyClick = (property: any) => {
    console.log('Property clicked:', property);
    // Navigate to property detail page
  };

  return (
    // <DashboardLayout>
    <div className='flex h-[calc(100vh-3.5rem)]'>
      {' '}
      {/* Subtract header height */}
      {/* Filters Sidebar */}
      <PropertyFilters
        filters={filters}
        onFiltersChange={setFilters}
        onClear={clearFilters}
      />
      {/* Main Content */}
      <div className='flex flex-1 flex-col overflow-hidden'>
        {/* Header with view toggle */}
        <div className='border-border bg-background border-b p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold'>Propiedades</h1>
              <p className='text-muted-foreground'>
                {totalProperties}{' '}
                {totalProperties === 1
                  ? 'propiedad encontrada'
                  : 'propiedades encontradas'}
              </p>
            </div>
            <PropertyViewToggle
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className='relative flex-1 overflow-hidden'>
          <ScrollArea className='h-full'>
            <div className='p-4 pb-20'>
              {' '}
              {/* Add bottom padding for sticky pagination */}
              {viewMode === 'card' && (
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                  {paginatedProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onClick={() => handlePropertyClick(property)}
                    />
                  ))}
                </div>
              )}
              {viewMode === 'list' && (
                <div className='space-y-4'>
                  {paginatedProperties.map((property) => (
                    <PropertyList
                      key={property.id}
                      property={property}
                      onClick={() => handlePropertyClick(property)}
                    />
                  ))}
                </div>
              )}
              {viewMode === 'map' && (
                <PropertyMap
                  properties={paginatedProperties}
                  onPropertyClick={handlePropertyClick}
                />
              )}
              {paginatedProperties.length === 0 && (
                <div className='py-12 text-center'>
                  <p className='text-muted-foreground'>
                    No se encontraron propiedades que coincidan con los filtros
                    seleccionados.
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Sticky Pagination */}
          {totalPages > 1 && (
            <PropertyPagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={totalProperties}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}
        </div>
      </div>
    </div>
    // </DashboardLayout>
  );
};

export default Properties;
