import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - HUNiA',
  description: 'Kelola properti dan akun Anda',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}