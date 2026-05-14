import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cari Properti - HUNiA',
  description: 'Cari rumah, ruko, kontrakan, dan kos-kosan impian Anda',
};

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PropertyGrid } from '@/components/PropertyGrid';
import { Search } from 'lucide-react';

interface SearchPageProps {
  searchParams: {
    province?: string;
    city?: string;
    district?: string;
    propertyType?: string;
    listingType?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const provinces = ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Banten'];

  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-black mb-2">Cari Properti</h1>
          <p className="text-emerald-50">Temukan properti impian Anda dengan filter pencarian yang detail</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 shadow-md sticky top-20">
            <h3 className="text-xl font-bold mb-6">Filter Pencarian</h3>

            <form action="/search" method="get" className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Provinsi
                </label>
                <select
                  name="province"
                  defaultValue={searchParams.province || ''}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="">Semua Provinsi</option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipe Properti
                </label>
                <select
                  name="propertyType"
                  defaultValue={searchParams.propertyType || ''}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="">Semua Tipe</option>
                  <option value="RUMAH">Rumah</option>
                  <option value="RUKO">Ruko</option>
                  <option value="KONTRAKAN">Kontrakan</option>
                  <option value="KOS_KOSAN">Kos-kosan</option>
                  <option value="APARTEMEN">Apartemen</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jenis Transaksi
                </label>
                <select
                  name="listingType"
                  defaultValue={searchParams.listingType || ''}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="">Semua</option>
                  <option value="JUAL">Jual</option>
                  <option value="SEWA">Sewa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Harga Minimum (Rp)
                </label>
                <input
                  type="number"
                  name="minPrice"
                  defaultValue={searchParams.minPrice || ''}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Harga Maksimum (Rp)
                </label>
                <input
                  type="number"
                  name="maxPrice"
                  defaultValue={searchParams.maxPrice || ''}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Cari
              </button>
            </form>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <PropertyGrid filters={searchParams} />
        </div>
      </div>

      <Footer />
    </>
  );
}