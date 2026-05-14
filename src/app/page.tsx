import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PropertyGrid } from '@/components/PropertyGrid';
import { ArrowRight, MapPin, Zap, Award } from 'lucide-react';

export default function Home() {
  const provinces = ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Banten'];
  const categories = [
    { title: 'Rumah', icon: '🏠', desc: 'Rumah dijual dan disewakan di berbagai kota' },
    { title: 'Ruko', icon: '🏢', desc: 'Ruko strategis untuk usaha dan bisnis' },
    { title: 'Kontrakan', icon: '🏘️', desc: 'Kontrakan bulanan dan tahunan' },
    { title: 'Kos-kosan', icon: '🛏️', desc: 'Kos pria, wanita, dan campur' },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-5xl font-black leading-tight mb-6">
              Temukan Rumah, Ruko, Kontrakan & Kos Dengan Mudah
            </h2>
            <p className="text-lg text-emerald-50 mb-8 leading-relaxed">
              HUNiA membantu Anda mencari properti untuk sewa maupun jual beli dengan sistem pencarian detail berdasarkan wilayah dan peta interaktif.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/search"
                className="bg-white text-emerald-700 px-6 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition inline-flex items-center gap-2"
              >
                Cari Properti
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/upload"
                className="border border-white px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-emerald-700 transition"
              >
                Pasang Iklan
              </Link>
            </div>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 text-gray-800">
            <h3 className="text-2xl font-bold mb-6">Pencarian Properti</h3>
            <form className="grid gap-4" action="/search" method="get">
              <select
                name="province"
                className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Pilih Provinsi</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>

              <select
                name="propertyType"
                className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Jenis Properti</option>
                <option value="RUMAH">Rumah</option>
                <option value="RUKO">Ruko</option>
                <option value="KONTRAKAN">Kontrakan</option>
                <option value="KOS_KOSAN">Kos-kosan</option>
              </select>

              <select
                name="listingType"
                className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Jenis Transaksi</option>
                <option value="JUAL">Jual</option>
                <option value="SEWA">Sewa</option>
              </select>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Harga Minimum"
                  className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Harga Maksimum"
                  className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg transition"
              >
                Cari Sekarang
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-bold mb-2">Pencarian Detail</h4>
            <p className="text-gray-600">Cari berdasarkan lokasi spesifik, harga, dan tipe properti</p>
          </div>
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-bold mb-2">Proses Cepat</h4>
            <p className="text-gray-600">Dapatkan respons langsung dari pemilik properti via WhatsApp</p>
          </div>
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-bold mb-2">Terpercaya</h4>
            <p className="text-gray-600">Properti terverifikasi dengan informasi lengkap dan akurat</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h3 className="text-4xl font-black mb-4">Kategori Properti</h3>
          <p className="text-gray-500 text-lg">
            Temukan berbagai jenis properti sesuai kebutuhan Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-3xl shadow-md p-7 hover:-translate-y-2 transition cursor-pointer"
            >
              <div className="text-5xl mb-5">{item.icon}</div>
              <h4 className="text-2xl font-bold mb-3">{item.title}</h4>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-4xl font-black mb-2">Properti Populer</h3>
            <p className="text-gray-500">Daftar properti terbaru dan paling dicari</p>
          </div>
          <Link
            href="/search"
            className="bg-emerald-600 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-emerald-700 transition"
          >
            Lihat Semua
          </Link>
        </div>

        <PropertyGrid />
      </section>

      <Footer />
    </>
  );
}