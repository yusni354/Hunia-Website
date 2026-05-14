import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Favorites - HUNiA',
};

export default function FavoritesPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-black mb-4">Properti Favorit</h1>
        <p className="text-gray-600 mb-8">Properti yang Anda simpan untuk nanti</p>
        <div className="text-center py-20">
          <p className="text-gray-500">Anda belum memiliki properti favorit</p>
        </div>
      </div>
      <Footer />
    </>
  );
}