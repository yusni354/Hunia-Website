import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daftar - HUNiA',
  description: 'Bergabung dengan platform marketplace properti terpercaya Indonesia',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}