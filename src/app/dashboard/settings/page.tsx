'use client';
import PageContainer from '@/components/layout/page-container';
import { VerticalTabs, VerticalTabsContent, VerticalTabsList, VerticalTabsTrigger } from '@/components/ui/vertical-tabs';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';
import {
  IconUser,
  IconBell,
  IconLock,
  IconCreditCard,
  IconApi,
  IconPalette
} from '@tabler/icons-react';
import { ThemeSelector } from '@/components/theme-selector';

import { useSearchParams } from 'next/navigation';

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'profile';
  const [dnd, setDnd] = useState(false);
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(true);
  const progress = 60;
  // Simulación de datos
  const user = {
    name: 'Lisandro Prado',
    email: 'lisandro@email.com',
    avatar: '',
    timezone: 'America/Argentina/Buenos_Aires',
    plan: 'Pro',
    usage: 60,
    apiKey: 'sk-1234...abcd',
    webhooks: 2
  };
  return (
    <PageContainer>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <VerticalTabs defaultValue={tab} className='w-full'>
        <VerticalTabsList>
          <VerticalTabsTrigger value='profile'>
            <IconUser className='size-5 mr-2' /> Perfil
          </VerticalTabsTrigger>
          <VerticalTabsTrigger value='notifications'>
            <IconBell className='size-5 mr-2' /> Notificaciones
          </VerticalTabsTrigger>
          <VerticalTabsTrigger value='security'>
            <IconLock className='size-5 mr-2' /> Seguridad
          </VerticalTabsTrigger>
          <VerticalTabsTrigger value='billing'>
            <IconCreditCard className='size-5 mr-2' /> Facturación
          </VerticalTabsTrigger>
          <VerticalTabsTrigger value='api'>
            <IconApi className='size-5 mr-2' /> API
          </VerticalTabsTrigger>
          <VerticalTabsTrigger value='appearance'>
            <IconPalette className='size-5 mr-2' /> Appearance
          </VerticalTabsTrigger>
        </VerticalTabsList>
        <VerticalTabsContent value='profile'>
          <Card className='flex flex-col gap-4 p-6'>
            <div className='flex items-center gap-4'>
              <Avatar className='size-16'>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className='text-lg font-bold'>{user.name}</div>
                <div className='text-muted-foreground text-sm'>{user.email}</div>
                <Badge variant='outline' className='mt-1'>
                  {user.timezone}
                </Badge>
              </div>
            </div>
          </Card>
        </VerticalTabsContent>
        <VerticalTabsContent value='notifications'>
          <Card className='flex flex-col gap-4 p-6'>
            <div className='flex items-center justify-between'>
              <span>Email</span>
              <Switch checked={email} onCheckedChange={setEmail} />
            </div>
            <div className='flex items-center justify-between'>
              <span>Push</span>
              <Switch checked={push} onCheckedChange={setPush} />
            </div>
            <div className='flex items-center justify-between'>
              <span>No molestar</span>
              <Switch checked={dnd} onCheckedChange={setDnd} />
            </div>
          </Card>
        </VerticalTabsContent>
        <VerticalTabsContent value='security'>
          <Card className='flex flex-col gap-4 p-6'>
            <div className='flex items-center justify-between'>
              <span>Contraseña</span>
              <Button
                variant='outline'
                size='sm'
                onClick={() => window.alert('Función no implementada')}
              >
                Cambiar
              </Button>
            </div>
            <div className='flex items-center justify-between'>
              <span>2FA</span>
              <Badge variant='default'>Activo</Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span>Sesiones activas</span>
              <Badge variant='secondary'>3</Badge>
            </div>
          </Card>
        </VerticalTabsContent>
        <VerticalTabsContent value='billing'>
          <Card className='flex flex-col gap-4 p-6'>
            <div className='flex items-center justify-between'>
              <span>Plan actual</span>
              <Badge variant='outline'>{user.plan}</Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span>Uso</span>
              <Progress value={progress} className='w-1/2' />
              <span>{progress}%</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>Historial de pagos</span>
              <Button variant='outline' size='sm'>
                Ver
              </Button>
            </div>
          </Card>
        </VerticalTabsContent>
        <VerticalTabsContent value='api'>
          <Card className='flex flex-col gap-4 p-6'>
            <div className='flex items-center justify-between'>
              <span>Clave API</span>
              <Badge variant='outline'>{user.apiKey}</Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span>Webhooks</span>
              <Badge variant='secondary'>{user.webhooks}</Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span>Uso</span>
              <Progress value={user.usage} className='w-1/2' />
              <span>{user.usage}%</span>
            </div>
          </Card>
        </VerticalTabsContent>
        <VerticalTabsContent value='appearance'>
          <Card className='flex flex-col gap-4 p-6'>
            <h3 className="text-lg font-medium">Theme</h3>
            <ThemeSelector />
          </Card>
        </VerticalTabsContent>
      </VerticalTabs>
    </PageContainer>
  );
}