import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HUNiA - Platform Jual Beli Sewa Properti Indonesia',
  description: 'Temukan rumah, ruko, kontrakan, dan kos-kosan impian Anda. HUNiA adalah platform marketplace properti terdepan di Indonesia dengan pencarian detail dan peta interaktif.',
  keywords: 'properti, rumah, ruko, kontrakan, kos, jual beli, sewa, Indonesia',
  authors: [{ name: 'HUNiA Team' }],
  creator: 'HUNiA',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://hunia.id',
    title: 'HUNiA - Platform Jual Beli Sewa Properti',
    description: 'Temukan properti impian Anda di HUNiA',
    images: [
      {
        url: 'https://hunia.id/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HUNiA - Platform Properti',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}