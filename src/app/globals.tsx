import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tailwind CSS Installation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}