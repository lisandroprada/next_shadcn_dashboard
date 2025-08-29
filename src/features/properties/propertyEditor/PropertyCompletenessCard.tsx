import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Property } from '@/types/property.schema';
import { CheckCircle2, AlertCircle, Circle } from 'lucide-react';

interface PropertyCompletenessCardProps {
  property: Partial<Property>;
  hasUnsavedChanges: boolean;
}

export function PropertyCompletenessCard({
  property,
  hasUnsavedChanges
}: PropertyCompletenessCardProps) {
  const checkCompleteness = () => {
    const checks = [
      {
        name: 'Información Básica',
        completed: !!(property.address && property.type && property.purpose)
      },
      {
        name: 'Propietarios',
        completed: !!(property.owners && property.owners.length > 0)
      },
      {
        name: 'Precios',
        completed: !!(
          property.valueForSale?.amount || property.valueForRent?.amount
        )
      },
      {
        name: 'Detalles',
        completed: !!(
          property.detailedDescription?.rooms &&
          property.detailedDescription?.bedrooms
        )
      },
      {
        name: 'Servicios',
        completed: !!(
          property.associatedServices && property.associatedServices.length > 0
        )
      },
      {
        name: 'Imágenes',
        completed: !!(property.img && property.img.length > 0)
      }
    ];

    const completedCount = checks.filter((check) => check.completed).length;
    const percentage = Math.round((completedCount / checks.length) * 100);

    return { checks, completedCount, total: checks.length, percentage };
  };

  const { checks, completedCount, total, percentage } = checkCompleteness();

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className='sticky top-6'>
      <CardHeader className='pb-4'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg'>Completitud</CardTitle>
          {hasUnsavedChanges && (
            <Badge
              variant='outline'
              className='border-orange-200 text-orange-600'
            >
              <Circle className='mr-1 h-2 w-2 fill-orange-600' />
              Cambios sin guardar
            </Badge>
          )}
        </div>
        <CardDescription>
          {completedCount} de {total} secciones completadas
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between text-sm'>
            <span>Progreso general</span>
            <span className={`font-medium ${getProgressColor(percentage)}`}>
              {percentage}%
            </span>
          </div>
          <Progress value={percentage} className='h-2' />
        </div>

        <div className='space-y-3'>
          {checks.map((check, index) => (
            <div key={index} className='flex items-center gap-3'>
              {check.completed ? (
                <CheckCircle2 className='h-4 w-4 flex-shrink-0 text-green-600' />
              ) : (
                <AlertCircle className='text-muted-foreground h-4 w-4 flex-shrink-0' />
              )}
              <span
                className={`text-sm ${check.completed ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                {check.name}
              </span>
            </div>
          ))}
        </div>

        <div className='border-t pt-4'>
          <div className='text-muted-foreground text-xs'>
            {percentage >= 80
              ? '¡Excelente! La propiedad está casi completa.'
              : percentage >= 60
                ? 'Bueno. Completa algunas secciones más.'
                : 'Completa más información para mejorar la visibilidad.'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
