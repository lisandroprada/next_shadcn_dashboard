'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Edit,
  User,
  CreditCard,
  Building2,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { mockParties } from '@/constants/mockParties';
import { Party } from '@/types/party';
import { CompletenessIndicator } from '@/features/parties/components/CompletnessIndicator';

export default function ClientDetail() {
  const params = useParams();
  const router = useRouter();
  const partyId = params.partyId as string;
  const [isEditing, setIsEditing] = useState(partyId === 'new');

  // Find party or create new one
  const initialParty =
    partyId === 'new'
      ? {
          _id: 'new',
          agentType: 'Client' as const,
          personType: 'Individual' as const,
          name: '',
          lastName: '',
          fullName: '',
          email: '',
          identityCard: '',
          phone: [{ number: '', type: 'whatsapp' as const }],
          bankAccounts: [],
          address: '',
          active: true,
          billing: false,
          createdAt: new Date(),
          consortiumDetails: []
        }
      : mockParties.find((p) => p._id === partyId);

  const [party, setParty] = useState<Party | undefined>(initialParty);

  if (!party) {
    return (
      <div className='bg-background flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h1 className='mb-4 text-2xl font-bold'>Cliente no encontrado</h1>
          <Button onClick={() => router.push('/dashboard/parties')}>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Volver a la lista
          </Button>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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

  const handleSave = () => {
    // Here you would typically save to backend
    // console.log('Saving party:', party);
    setIsEditing(false);
    if (partyId === 'new') {
      router.push('/dashboard/parties');
    }
  };

  const handleCancel = () => {
    if (partyId === 'new') {
      router.push('/dashboard/parties');
    } else {
      setIsEditing(false);
      // Reset to original values
      const original = mockParties.find((p) => p._id === partyId);
      if (original) setParty(original);
    }
  };

  const updateParty = (updates: Partial<Party>) => {
    setParty((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  return (
    <div className='bg-background min-h-screen'>
      {/* Fixed Header */}
      <div className='bg-background border-border sticky top-0 z-10 border-b'>
        <div className='mx-auto max-w-7xl p-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Button
                variant='ghost'
                onClick={() => router.push('/dashboard/parties')}
                className='gap-2'
              >
                <ArrowLeft className='h-4 w-4' />
                Volver
              </Button>

              <div className='flex items-center gap-3'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage src={party.photo} />
                  <AvatarFallback className='bg-primary/10 text-primary font-semibold'>
                    {getInitials(party.fullName || party.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className='text-2xl font-bold'>
                    {partyId === 'new' ? 'Nuevo Cliente' : party.fullName}
                  </h1>
                  <p className='text-muted-foreground'>
                    {getAgentTypeLabel(party.agentType)} •{' '}
                    {party.personType === 'Individual'
                      ? 'Persona Física'
                      : 'Persona Jurídica'}
                  </p>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              {isEditing ? (
                <>
                  <Button variant='outline' onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} className='gap-2'>
                    <Save className='h-4 w-4' />
                    Guardar
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className='gap-2'>
                  <Edit className='h-4 w-4' />
                  Editar
                </Button>
              )}
            </div>
          </div>

          {partyId !== 'new' && (
            <div className='mt-4'>
              <CompletenessIndicator party={party} showDetails={true} />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className='mx-auto max-w-7xl p-6'>
        <Tabs defaultValue='personal' className='space-y-6'>
          <TabsList className='grid w-full grid-cols-4'>
            <TabsTrigger value='personal' className='gap-2'>
              <User className='h-4 w-4' />
              Personal
            </TabsTrigger>
            <TabsTrigger value='contact' className='gap-2'>
              <Phone className='h-4 w-4' />
              Contacto
            </TabsTrigger>
            <TabsTrigger value='financial' className='gap-2'>
              <CreditCard className='h-4 w-4' />
              Financiero
            </TabsTrigger>
            <TabsTrigger value='business' className='gap-2'>
              <Building2 className='h-4 w-4' />
              Comercial
            </TabsTrigger>
          </TabsList>

          <TabsContent value='personal' className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <User className='h-5 w-5' />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='agentType'>Tipo de Agente</Label>
                    <Select
                      value={party.agentType}
                      onValueChange={(value) =>
                        updateParty({ agentType: value as any })
                      }
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className='bg-popover border-border z-50 border shadow-lg'>
                        <SelectItem value='Client'>Cliente</SelectItem>
                        <SelectItem value='Supplier'>Proveedor</SelectItem>
                        <SelectItem value='ServiceCompany'>
                          Empresa de Servicios
                        </SelectItem>
                        <SelectItem value='Consortium'>Consorcio</SelectItem>
                        <SelectItem value='Agency'>Agencia</SelectItem>
                        <SelectItem value='Real Estate'>
                          Inmobiliaria
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='personType'>Tipo de Persona</Label>
                    <Select
                      value={party.personType}
                      onValueChange={(value) =>
                        updateParty({ personType: value as any })
                      }
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className='bg-popover border-border z-50 border shadow-lg'>
                        <SelectItem value='Individual'>
                          Persona Física
                        </SelectItem>
                        <SelectItem value='Legal Entity'>
                          Persona Jurídica
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='name'>Nombre</Label>
                    <Input
                      id='name'
                      value={party.name}
                      onChange={(e) => updateParty({ name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  {party.personType === 'Individual' && (
                    <div className='space-y-2'>
                      <Label htmlFor='lastName'>Apellido</Label>
                      <Input
                        id='lastName'
                        value={party.lastName || ''}
                        onChange={(e) =>
                          updateParty({ lastName: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  )}

                  <div className='space-y-2'>
                    <Label htmlFor='identityCard'>DNI/CUIT</Label>
                    <Input
                      id='identityCard'
                      value={party.identityCard}
                      onChange={(e) =>
                        updateParty({ identityCard: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  {party.personType === 'Individual' && (
                    <>
                      <div className='space-y-2'>
                        <Label htmlFor='gender'>Género</Label>
                        <Select
                          value={party.gender || ''}
                          onValueChange={(value) =>
                            updateParty({ gender: value as any })
                          }
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Seleccionar género' />
                          </SelectTrigger>
                          <SelectContent className='bg-popover border-border z-50 border shadow-lg'>
                            <SelectItem value='Male'>Masculino</SelectItem>
                            <SelectItem value='Female'>Femenino</SelectItem>
                            <SelectItem value='Non-binary'>
                              No binario
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='maritalStatus'>Estado Civil</Label>
                        <Input
                          id='maritalStatus'
                          value={party.maritalStatus || ''}
                          onChange={(e) =>
                            updateParty({ maritalStatus: e.target.value })
                          }
                          disabled={!isEditing}
                          placeholder='Ej: Soltero, Casado, Divorciado'
                        />
                      </div>
                    </>
                  )}
                </div>

                <Separator />

                <div className='flex items-center gap-4'>
                  <div className='flex items-center space-x-2'>
                    <input
                      type='checkbox'
                      id='active'
                      checked={party.active}
                      onChange={(e) =>
                        updateParty({ active: e.target.checked })
                      }
                      disabled={!isEditing}
                      className='border-border rounded'
                    />
                    <Label htmlFor='active'>Cliente activo</Label>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <input
                      type='checkbox'
                      id='billing'
                      checked={party.billing}
                      onChange={(e) =>
                        updateParty({ billing: e.target.checked })
                      }
                      disabled={!isEditing}
                      className='border-border rounded'
                    />
                    <Label htmlFor='billing'>Habilitado para facturación</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='contact' className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Phone className='h-5 w-5' />
                  Información de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      value={party.email}
                      onChange={(e) => updateParty({ email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='postalCode'>Código Postal</Label>
                    <Input
                      id='postalCode'
                      value={party.postalCode || ''}
                      onChange={(e) =>
                        updateParty({ postalCode: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='address'>Dirección</Label>
                  <Textarea
                    id='address'
                    value={party.address || ''}
                    onChange={(e) => updateParty({ address: e.target.value })}
                    disabled={!isEditing}
                    rows={2}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='workAddress'>Dirección Laboral</Label>
                  <Textarea
                    id='workAddress'
                    value={party.workAddress || ''}
                    onChange={(e) =>
                      updateParty({ workAddress: e.target.value })
                    }
                    disabled={!isEditing}
                    rows={2}
                  />
                </div>

                <Separator />

                <div className='space-y-4'>
                  <Label>Teléfonos</Label>
                  {party.phone.map((phone, index) => (
                    <div key={index} className='flex gap-3'>
                      <Input
                        value={phone.number}
                        onChange={(e) => {
                          const newPhones = [...party.phone];
                          newPhones[index] = {
                            ...phone,
                            number: e.target.value
                          };
                          updateParty({ phone: newPhones });
                        }}
                        disabled={!isEditing}
                        placeholder='Número de teléfono'
                        className='flex-1'
                      />
                      <Select
                        value={phone.type}
                        onValueChange={(value) => {
                          const newPhones = [...party.phone];
                          newPhones[index] = { ...phone, type: value as any };
                          updateParty({ phone: newPhones });
                        }}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className='w-32'>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className='bg-popover border-border z-50 border shadow-lg'>
                          <SelectItem value='home'>Casa</SelectItem>
                          <SelectItem value='work'>Trabajo</SelectItem>
                          <SelectItem value='whatsapp'>WhatsApp</SelectItem>
                          <SelectItem value='other'>Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}

                  {isEditing && (
                    <Button
                      variant='outline'
                      onClick={() => {
                        updateParty({
                          phone: [...party.phone, { number: '', type: 'other' }]
                        });
                      }}
                      className='w-full'
                    >
                      + Agregar teléfono
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='financial' className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <CreditCard className='h-5 w-5' />
                  Información Financiera
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='taxId'>CUIT</Label>
                    <Input
                      id='taxId'
                      value={party.taxId || ''}
                      onChange={(e) => updateParty({ taxId: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='iva'>Condición IVA</Label>
                    <Input
                      id='iva'
                      value={party.iva || ''}
                      onChange={(e) => updateParty({ iva: e.target.value })}
                      disabled={!isEditing}
                      placeholder='Ej: Responsable Inscripto'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='taxAddress'>Domicilio Fiscal</Label>
                  <Textarea
                    id='taxAddress'
                    value={party.taxAddress || ''}
                    onChange={(e) =>
                      updateParty({ taxAddress: e.target.value })
                    }
                    disabled={!isEditing}
                    rows={2}
                  />
                </div>

                <Separator />

                <div className='space-y-4'>
                  <Label>Cuentas Bancarias</Label>
                  {party.bankAccounts.map((account, index) => (
                    <Card key={index} className='p-4'>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div className='space-y-2'>
                          <Label>Banco</Label>
                          <Input
                            value={account.bank}
                            onChange={(e) => {
                              const newAccounts = [...party.bankAccounts];
                              newAccounts[index] = {
                                ...account,
                                bank: e.target.value
                              };
                              updateParty({ bankAccounts: newAccounts });
                            }}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label>CBU</Label>
                          <Input
                            value={account.cbu}
                            onChange={(e) => {
                              const newAccounts = [...party.bankAccounts];
                              newAccounts[index] = {
                                ...account,
                                cbu: e.target.value
                              };
                              updateParty({ bankAccounts: newAccounts });
                            }}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className='space-y-2 md:col-span-2'>
                          <Label>Descripción</Label>
                          <Input
                            value={account.description || ''}
                            onChange={(e) => {
                              const newAccounts = [...party.bankAccounts];
                              newAccounts[index] = {
                                ...account,
                                description: e.target.value
                              };
                              updateParty({ bankAccounts: newAccounts });
                            }}
                            disabled={!isEditing}
                            placeholder='Ej: Cuenta principal'
                          />
                        </div>
                      </div>
                    </Card>
                  ))}

                  {isEditing && (
                    <Button
                      variant='outline'
                      onClick={() => {
                        updateParty({
                          bankAccounts: [
                            ...party.bankAccounts,
                            { bank: '', cbu: '', description: '' }
                          ]
                        });
                      }}
                      className='w-full'
                    >
                      + Agregar cuenta bancaria
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='business' className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Building2 className='h-5 w-5' />
                  Información Comercial
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <Label htmlFor='supplierMask'>Código de Proveedor</Label>
                  <Input
                    id='supplierMask'
                    value={party.supplierMask || ''}
                    onChange={(e) =>
                      updateParty({ supplierMask: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                {party.agentType === 'Consortium' &&
                  party.consortiumDetails.length > 0 && (
                    <div className='space-y-4'>
                      <Label>Detalles del Consorcio</Label>
                      {party.consortiumDetails.map((detail, index) => (
                        <Card key={index} className='p-4'>
                          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <div className='space-y-2'>
                              <Label>Nombre del Gasto</Label>
                              <Input
                                value={detail.expenseName}
                                disabled={!isEditing}
                              />
                            </div>
                            <div className='space-y-2'>
                              <Label>Monto</Label>
                              <Input
                                type='number'
                                value={detail.expenseAmount}
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                {party.agent && (
                  <div className='space-y-4'>
                    <Label>Información del Agente</Label>
                    <Card className='p-4'>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div className='space-y-2'>
                          <Label>Nombre Completo</Label>
                          <Input
                            value={party.agent.fullName}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label>Email</Label>
                          <Input
                            value={party.agent.email || ''}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label>DNI</Label>
                          <Input
                            value={party.agent.identityCard || ''}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label>Género</Label>
                          <Input
                            value={party.agent.gender || ''}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className='space-y-2 md:col-span-2'>
                          <Label>Dirección</Label>
                          <Textarea
                            value={party.agent.address || ''}
                            disabled={!isEditing}
                            rows={2}
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
