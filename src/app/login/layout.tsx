import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Masuk - HUNiA',
  description: 'Masuk ke akun HUNiA Anda',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}