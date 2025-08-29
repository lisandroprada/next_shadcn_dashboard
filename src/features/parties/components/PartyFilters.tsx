import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

export interface PartyFilters {
  search: string;
  agentType: string;
  personType: string;
  active: boolean | null;
  billing: boolean | null;
}

interface PartyFiltersProps {
  filters: PartyFilters;
  onFiltersChange: (filters: PartyFilters) => void;
}

export function PartyFilters({ filters, onFiltersChange }: PartyFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleFilterChange = (key: keyof PartyFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      agentType: '',
      personType: '',
      active: null,
      billing: null
    });
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'search') return value !== '';
    return value !== '' && value !== null;
  }).length;

  return (
    <div className='space-y-4'>
      {/* Search Bar */}
      <div className='relative'>
        <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform' />
        <Input
          placeholder='Buscar por nombre, email, DNI...'
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className='bg-card border-border pl-10'
        />
      </div>

      {/* Filter Controls */}
      <div className='flex flex-wrap items-center gap-3'>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant='outline' className='gap-2'>
              <Filter className='h-4 w-4' />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge
                  variant='secondary'
                  className='ml-1 px-1.5 py-0.5 text-xs'
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-80 space-y-4'>
            <div className='space-y-3'>
              <h4 className='font-medium'>Filtros avanzados</h4>

              {/* Agent Type Filter */}
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Tipo de agente</label>
                <Select
                  value={filters.agentType || 'all'}
                  onValueChange={(value) =>
                    handleFilterChange(
                      'agentType',
                      value === 'all' ? '' : value
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Todos los tipos' />
                  </SelectTrigger>
                  <SelectContent className='bg-popover border-border z-50 border shadow-lg'>
                    <SelectItem value='all'>Todos los tipos</SelectItem>
                    <SelectItem value='Client'>Cliente</SelectItem>
                    <SelectItem value='Supplier'>Proveedor</SelectItem>
                    <SelectItem value='ServiceCompany'>
                      Empresa de Servicios
                    </SelectItem>
                    <SelectItem value='Consortium'>Consorcio</SelectItem>
                    <SelectItem value='Agency'>Agencia</SelectItem>
                    <SelectItem value='Real Estate'>Inmobiliaria</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Person Type Filter */}
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Tipo de persona</label>
                <Select
                  value={filters.personType || 'all'}
                  onValueChange={(value) =>
                    handleFilterChange(
                      'personType',
                      value === 'all' ? '' : value
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Todos los tipos' />
                  </SelectTrigger>
                  <SelectContent className='bg-popover border-border z-50 border shadow-lg'>
                    <SelectItem value='all'>Todos los tipos</SelectItem>
                    <SelectItem value='Individual'>Persona Física</SelectItem>
                    <SelectItem value='Legal Entity'>
                      Persona Jurídica
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filters */}
              <div className='space-y-3'>
                <label className='text-sm font-medium'>Estado</label>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='active'
                    checked={filters.active === true}
                    onCheckedChange={(checked) =>
                      handleFilterChange('active', checked ? true : null)
                    }
                  />
                  <label htmlFor='active' className='text-sm'>
                    Solo activos
                  </label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='billing'
                    checked={filters.billing === true}
                    onCheckedChange={(checked) =>
                      handleFilterChange('billing', checked ? true : null)
                    }
                  />
                  <label htmlFor='billing' className='text-sm'>
                    Habilitado para facturación
                  </label>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {activeFiltersCount > 0 && (
          <Button
            variant='ghost'
            onClick={clearFilters}
            className='text-muted-foreground hover:text-foreground gap-2'
          >
            <X className='h-4 w-4' />
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className='flex flex-wrap gap-2'>
          {filters.agentType && (
            <Badge variant='secondary' className='gap-1'>
              Tipo: {filters.agentType}
              <X
                className='hover:text-destructive h-3 w-3 cursor-pointer'
                onClick={() => handleFilterChange('agentType', '')}
              />
            </Badge>
          )}
          {filters.personType && (
            <Badge variant='secondary' className='gap-1'>
              Persona:{' '}
              {filters.personType === 'Individual' ? 'Física' : 'Jurídica'}
              <X
                className='hover:text-destructive h-3 w-3 cursor-pointer'
                onClick={() => handleFilterChange('personType', '')}
              />
            </Badge>
          )}
          {filters.active === true && (
            <Badge variant='secondary' className='gap-1'>
              Solo activos
              <X
                className='hover:text-destructive h-3 w-3 cursor-pointer'
                onClick={() => handleFilterChange('active', null)}
              />
            </Badge>
          )}
          {filters.billing === true && (
            <Badge variant='secondary' className='gap-1'>
              Con facturación
              <X
                className='hover:text-destructive h-3 w-3 cursor-pointer'
                onClick={() => handleFilterChange('billing', null)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
