'use client';

import { useState, useMemo } from 'react';
import { Plus, Eye, Edit, MoreHorizontal, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { mockParties } from '@/constants/mockParties';
import { Party } from '@/types/party';
import { PartyFilters } from '@/features/parties/components/PartyFilters';
import { CompletenessIndicator } from '@/features/parties/components/CompletnessIndicator';
import { useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 6;

export default function Clients() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [filters, setFilters] = useState<PartyFilters>({
    search: '',
    agentType: '',
    personType: '',
    active: null,
    billing: null
  });

  const filteredParties = useMemo(() => {
    return mockParties.filter((party) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          party.fullName.toLowerCase().includes(searchLower) ||
          party.email.toLowerCase().includes(searchLower) ||
          party.identityCard.includes(searchLower) ||
          party.phone.some((p) => p.number.includes(searchLower));

        if (!matchesSearch) return false;
      }

      // Agent type filter
      if (filters.agentType && party.agentType !== filters.agentType)
        return false;

      // Person type filter
      if (filters.personType && party.personType !== filters.personType)
        return false;

      // Active filter
      if (filters.active !== null && party.active !== filters.active)
        return false;

      // Billing filter
      if (filters.billing !== null && party.billing !== filters.billing)
        return false;

      return true;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredParties.length / ITEMS_PER_PAGE);
  const paginatedParties = filteredParties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleViewParty = (party: Party) => {
    setSelectedParty(party);
    setIsViewModalOpen(true);
  };

  const handleEditParty = (partyId: string) => {
    router.push(`/dashboard/parties/${partyId}`);
  };

  const getAgentTypeLabel = (type: string) => {
    const labels = {
      Client: 'Cliente',
      Supplier: 'Proveedor',
      ServiceCompany: 'Empresa de Servicios',
      Consortium: 'Consorcio',
      Agency: 'Agencia',
      'Real Estate': 'Inmobiliaria'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className='bg-background min-h-screen'>
      {/* Fixed Header */}
      <div className='bg-background border-border sticky top-0 z-10 border-b'>
        <div className='mx-auto max-w-7xl p-6'>
          <div className='mb-6 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg'>
                <Users className='text-primary h-6 w-6' />
              </div>
              <div>
                <h1 className='text-foreground text-2xl font-bold'>
                  Gestión de Clientes
                </h1>
                <p className='text-muted-foreground'>
                  {filteredParties.length} de {mockParties.length} registros
                </p>
              </div>
            </div>
            <Button
              onClick={() => router.push('/dashboard/parties/new')}
              className='gap-2'
            >
              <Plus className='h-4 w-4' />
              Nuevo Cliente
            </Button>
          </div>

          <PartyFilters filters={filters} onFiltersChange={setFilters} />
        </div>
      </div>

      {/* Content */}
      <div className='mx-auto max-w-7xl p-6'>
        {/* Parties Grid */}
        <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {paginatedParties.map((party) => (
            <Card
              key={party._id}
              className='transition-shadow duration-200 hover:shadow-md'
            >
              <CardContent className='p-6'>
                <div className='mb-4 flex items-start justify-between'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-12 w-12'>
                      <AvatarImage src={party.photo} />
                      <AvatarFallback className='bg-primary/10 text-primary font-semibold'>
                        {getInitials(party.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className='min-w-0 flex-1'>
                      <h3 className='text-foreground truncate font-semibold'>
                        {party.fullName}
                      </h3>
                      <p className='text-muted-foreground truncate text-sm'>
                        {party.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem onClick={() => handleViewParty(party)}>
                        <Eye className='mr-2 h-4 w-4' />
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEditParty(party._id)}
                      >
                        <Edit className='mr-2 h-4 w-4' />
                        Editar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className='space-y-3'>
                  <div className='flex items-center gap-2'>
                    <Badge
                      variant={party.active ? 'default' : 'secondary'}
                      className={
                        party.active ? 'bg-success text-success-foreground' : ''
                      }
                    >
                      {party.active ? 'Activo' : 'Inactivo'}
                    </Badge>
                    <Badge variant='outline'>
                      {getAgentTypeLabel(party.agentType)}
                    </Badge>
                  </div>

                  <div className='text-muted-foreground space-y-1 text-sm'>
                    <p>DNI/CUIT: {party.identityCard}</p>
                    {party.phone.length > 0 && (
                      <p>Tel: {party.phone[0].number}</p>
                    )}
                    {party.address && (
                      <p className='truncate'>📍 {party.address}</p>
                    )}
                  </div>

                  <CompletenessIndicator party={party} />
                </div>

                {/* Action Buttons */}
                <div className='mt-4 flex gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleViewParty(party)}
                    className='flex-1 gap-2'
                  >
                    <Eye className='h-4 w-4' />
                    Ver
                  </Button>
                  <Button
                    variant='default'
                    size='sm'
                    onClick={() => handleEditParty(party._id)}
                    className='flex-1 gap-2'
                  >
                    <Edit className='h-4 w-4' />
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {paginatedParties.length === 0 && (
          <div className='py-12 text-center'>
            <Users className='text-muted-foreground mx-auto mb-4 h-16 w-16' />
            <h3 className='text-foreground mb-2 text-lg font-semibold'>
              No se encontraron clientes
            </h3>
            <p className='text-muted-foreground mb-4'>
              Ajusta los filtros o crea un nuevo cliente para comenzar.
            </p>
            <Button onClick={() => router.push('/dashboard/parties/new')}>
              <Plus className='mr-2 h-4 w-4' />
              Crear nuevo cliente
            </Button>
          </div>
        )}

        {/* Fixed Pagination */}
        {totalPages > 1 && (
          <div className='bg-background border-border sticky bottom-0 border-t p-4'>
            <div className='flex items-center justify-between'>
              <p className='text-muted-foreground text-sm'>
                Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} a{' '}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredParties.length)}{' '}
                de {filteredParties.length} resultados
              </p>

              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>

                <div className='flex items-center gap-1'>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size='sm'
                        onClick={() => setCurrentPage(page)}
                        className='h-8 w-8 p-0'
                      >
                        {page}
                      </Button>
                    )
                  )}
                </div>

                <Button
                  variant='outline'
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Detalles del Cliente</DialogTitle>
          </DialogHeader>
          {selectedParty && (
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Avatar className='h-16 w-16'>
                  <AvatarImage src={selectedParty.photo} />
                  <AvatarFallback className='bg-primary/10 text-primary text-lg font-semibold'>
                    {getInitials(selectedParty.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='text-xl font-semibold'>
                    {selectedParty.fullName}
                  </h3>
                  <p className='text-muted-foreground'>{selectedParty.email}</p>
                  <div className='mt-2 flex gap-2'>
                    <Badge
                      variant={selectedParty.active ? 'default' : 'secondary'}
                    >
                      {selectedParty.active ? 'Activo' : 'Inactivo'}
                    </Badge>
                    <Badge variant='outline'>
                      {getAgentTypeLabel(selectedParty.agentType)}
                    </Badge>
                  </div>
                </div>
              </div>

              <CompletenessIndicator party={selectedParty} showDetails={true} />

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <h4 className='mb-2 font-semibold'>Información Personal</h4>
                  <div className='space-y-2 text-sm'>
                    <p>
                      <span className='font-medium'>DNI/CUIT:</span>{' '}
                      {selectedParty.identityCard}
                    </p>
                    {selectedParty.gender && (
                      <p>
                        <span className='font-medium'>Género:</span>{' '}
                        {selectedParty.gender}
                      </p>
                    )}
                    {selectedParty.maritalStatus && (
                      <p>
                        <span className='font-medium'>Estado Civil:</span>{' '}
                        {selectedParty.maritalStatus}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className='mb-2 font-semibold'>Contacto</h4>
                  <div className='space-y-2 text-sm'>
                    {selectedParty.phone.map((phone, index) => (
                      <p key={index}>
                        <span className='font-medium'>{phone.type}:</span>{' '}
                        {phone.number}
                      </p>
                    ))}
                    {selectedParty.address && (
                      <p>
                        <span className='font-medium'>Dirección:</span>{' '}
                        {selectedParty.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {selectedParty.bankAccounts.length > 0 && (
                <div>
                  <h4 className='mb-2 font-semibold'>Cuentas Bancarias</h4>
                  {selectedParty.bankAccounts.map((account, index) => (
                    <div key={index} className='bg-muted/50 rounded-lg p-3'>
                      <p className='font-medium'>{account.bank}</p>
                      <p className='text-muted-foreground text-sm'>
                        CBU: {account.cbu}
                      </p>
                      {account.description && (
                        <p className='text-muted-foreground text-sm'>
                          {account.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className='flex justify-end gap-2'>
                <Button
                  variant='outline'
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Cerrar
                </Button>
                <Button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleEditParty(selectedParty._id);
                  }}
                >
                  Editar Cliente
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
