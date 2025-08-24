'use client';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState, useEffect, useContext } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from '../services/auth';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/features/auth/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user, loading: authLoading } = useContext(AuthContext);

  const formSchema = z.object({
    email: z.string().email({ message: 'Email inválido' }),
    password: z.string().min(1, 'La contraseña es obligatoria'),
    rememberMe: z.boolean().optional()
  });

  // RememberMe: cargar email si está guardado
  const rememberedEmail =
    typeof window !== 'undefined'
      ? localStorage.getItem('rememberedEmail') || ''
      : '';
  const remembered =
    typeof window !== 'undefined'
      ? localStorage.getItem('rememberMe') === 'true'
      : false;

  // Si ya está logueado, redirigir a /dashboard
  useEffect(() => {
    if (!authLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, authLoading, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: rememberedEmail,
      password: '',
      rememberMe: remembered
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    try {
      // RememberMe: guardar o limpiar email
      if (typeof window !== 'undefined') {
        if (values.rememberMe) {
          localStorage.setItem('rememberedEmail', values.email);
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.setItem('rememberMe', 'false');
        }
      }
      const data = await login(
        values.email,
        values.password,
        values.rememberMe ?? false
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', data.access_token);
        // Redirigir a la última ruta guardada si existe
        const lastPath = localStorage.getItem('lastPath');
        if (lastPath && lastPath !== '/auth/sign-in') {
          localStorage.removeItem('lastPath');
          router.replace(lastPath);
          return;
        }
      }
      router.replace('/dashboard');
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || 'Error desconocido'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/examples/authentication'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute top-4 right-4 hidden md:top-8 md:right-8'
        )}
      >
        Login
      </Link>
      {/* Lado izquierdo: formulario */}
      <div className='flex h-full items-center justify-center bg-white p-4 lg:p-8 dark:bg-neutral-900'>
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          {/* Logo Rentia: claro para dark, oscuro para light */}
          <div className='mb-2 flex w-40 justify-center'>
            <Image
              src='/assets/images/logo_rentia/rentia-oscuro.svg'
              alt='Logo Rentia Light'
              width={180}
              height={60}
              className='block dark:block'
              priority
            />
            <Image
              src='/assets/images/logo_rentia/rentia-claro.svg'
              alt='Logo Rentia Dark'
              width={180}
              height={60}
              className='hidden dark:hidden'
              priority
            />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-8'
            >
              <div className='grid gap-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <FormLabel htmlFor='email'>Email</FormLabel>
                      <FormControl>
                        <Input
                          id='email'
                          placeholder='johndoe@mail.com'
                          type='email'
                          autoComplete='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <div className='flex items-center justify-between'>
                        <FormLabel htmlFor='password'>Contraseña</FormLabel>
                        <Link
                          href='#'
                          className='ml-auto inline-block text-sm underline'
                        >
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          id='password'
                          placeholder='******'
                          type='password'
                          autoComplete='current-password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='rememberMe'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center gap-2 space-y-0'>
                      <FormControl>
                        <input
                          id='rememberMe'
                          type='checkbox'
                          checked={field.value}
                          onChange={field.onChange}
                          className='mr-2'
                        />
                      </FormControl>
                      <FormLabel htmlFor='rememberMe' className='text-sm'>
                        Recordarme
                      </FormLabel>
                    </FormItem>
                  )}
                />
                {error && <div className='text-sm text-red-500'>{error}</div>}
                <Button type='submit' className='w-full' disabled={loading}>
                  {loading ? 'Ingresando...' : 'Ingresar'}
                </Button>
              </div>
            </form>
          </Form>
          <p className='text-muted-foreground px-8 text-center text-sm'>
            Al continuar, aceptas nuestros{' '}
            <Link
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              Términos de Servicio
            </Link>{' '}
            y{' '}
            <Link
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              Política de Privacidad
            </Link>
            .
          </p>
        </div>
      </div>
      {/* Lado derecho: imagen de fondo */}
      <div className='relative hidden h-full w-full lg:block'>
        <Image
          src='/assets/images/fondo/fondo.avif'
          alt='Fondo login'
          fill
          className='object-cover'
          priority
          sizes='100vw'
        />
      </div>
    </div>
  );
}
