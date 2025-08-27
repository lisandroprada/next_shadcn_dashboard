'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export type Property = {
  _id: string;
  address: string;
  type: string;
  purpose: string;
  status: string;
};

export const columns: ColumnDef<Property>[] = [
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    accessorKey: 'type',
    header: 'Type'
  },
  {
    accessorKey: 'purpose',
    header: 'Purpose'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const property = row.original;

      return (
        <Button asChild>
          <Link href={`/dashboard/properties/${property._id}/edit`}>Edit</Link>
        </Button>
      );
    }
  }
];