'use client';
import ProtectedRoute from '@/features/auth/components/ProtectedRoute';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      router.replace('/dashboard/overview');
    }
    // If no token, ProtectedRoute will redirect
  }, [router]);
  return <ProtectedRoute>{null}</ProtectedRoute>;
}
