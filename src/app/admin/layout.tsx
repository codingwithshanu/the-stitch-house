import React from 'react';
import { getAdminFromCookies } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminClientLayout from './AdminClientLayout';

export const metadata = {
  title: 'Admin Dashboard | The Stitch House',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminFromCookies();

  return (
    <AdminClientLayout initialAdmin={admin}>
      {children}
    </AdminClientLayout>
  );
}
