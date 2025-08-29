import { Party } from '@/types/party';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

interface CompletenessIndicatorProps {
  party: Party;
  showDetails?: boolean;
}

export function CompletenessIndicator({
  party,
  showDetails = false
}: CompletenessIndicatorProps) {
  const calculateCompleteness = (
    party: Party
  ): { percentage: number; missing: string[] } => {
    const fields = [
      { key: 'email', name: 'Email', value: party.email },
      {
        key: 'phone',
        name: 'Teléfono',
        value: party.phone?.length > 0 && party.phone[0].number !== '0000000000'
      },
      { key: 'address', name: 'Dirección', value: party.address },
      { key: 'identityCard', name: 'DNI/CUIT', value: party.identityCard },
      {
        key: 'bankAccounts',
        name: 'Cuenta Bancaria',
        value: party.bankAccounts?.length > 0
      }
    ];

    if (party.personType === 'Individual') {
      fields.push({ key: 'lastName', name: 'Apellido', value: party.lastName });
    }

    if (party.billing) {
      fields.push(
        { key: 'taxId', name: 'CUIT', value: party.taxId },
        { key: 'taxAddress', name: 'Domicilio Fiscal', value: party.taxAddress }
      );
    }

    const completedFields = fields.filter((field) => field.value).length;
    const totalFields = fields.length;
    const percentage = Math.round((completedFields / totalFields) * 100);
    const missing = fields
      .filter((field) => !field.value)
      .map((field) => field.name);

    return { percentage, missing };
  };

  const { percentage, missing } = calculateCompleteness(party);

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return 'success';
    if (percentage >= 70) return 'warning';
    return 'destructive';
  };

  const getStatusText = (percentage: number) => {
    if (percentage >= 90) return 'Completo';
    if (percentage >= 70) return 'Incompleto';
    return 'Crítico';
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center gap-3'>
        <div className='flex-1'>
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-sm font-medium'>Completitud del perfil</span>
            <div className='flex items-center gap-2'>
              {percentage >= 90 && (
                <CheckCircle2 className='text-success h-4 w-4' />
              )}
              <span className='text-sm font-semibold'>{percentage}%</span>
            </div>
          </div>
          <Progress value={percentage} className='h-2' />
        </div>
        <Badge
          variant={
            getStatusColor(percentage) === 'success' ? 'default' : 'destructive'
          }
          className={`${
            getStatusColor(percentage) === 'success'
              ? 'bg-success text-success-foreground'
              : getStatusColor(percentage) === 'warning'
                ? 'bg-warning text-warning-foreground'
                : 'bg-destructive text-destructive-foreground'
          }`}
        >
          {getStatusText(percentage)}
        </Badge>
      </div>

      {showDetails && missing.length > 0 && (
        <div className='text-muted-foreground text-sm'>
          <span className='font-medium'>Faltan: </span>
          {missing.join(', ')}
        </div>
      )}
    </div>
  );
}
