'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UploadPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'RUMAH',
    listingType: 'JUAL',
    price: '',
    bedrooms: '2',
    bathrooms: '1',
    province: 'DKI Jakarta',
    city: '',
    district: '',
    address: '',
    latitude: '',
    longitude: '',
    whatsappNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Gagal mengunggah properti');
      }

      toast.success('Properti berhasil diunggah!');
      setFormData({
        title: '',
        description: '',
        propertyType: 'RUMAH',
        listingType: 'JUAL',
        price: '',
        bedrooms: '2',
        bathrooms: '1',
        province: 'DKI Jakarta',
        city: '',
        district: '',
        address: '',
        latitude: '',
        longitude: '',
        whatsappNumber: '',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Akses Ditolak</h1>
          <p className="text-gray-600">Anda harus login terlebih dahulu untuk pasang iklan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Pasang Iklan Properti</h1>
        <p className="text-gray-600">Isi semua informasi properti Anda dengan detail</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg p-8 space-y-8">
        {/* Basic Info */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Informasi Dasar</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Properti</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Contoh: Rumah Mewah di Jakarta Selatan"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                rows={5}
                placeholder="Jelaskan detail properti Anda..."
                required
              />
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Detail Properti</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tipe Properti</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="RUMAH">Rumah</option>
                <option value="RUKO">Ruko</option>
                <option value="KONTRAKAN">Kontrakan</option>
                <option value="KOS_KOSAN">Kos-kosan</option>
                <option value="APARTEMEN">Apartemen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Transaksi</label>
              <select
                name="listingType"
                value={formData.listingType}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="JUAL">Jual</option>
                <option value="SEWA">Sewa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Harga (Rp)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Kamar Tidur</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Kamar Mandi</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                min="1"
                required
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Lokasi</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Provinsi</label>
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="DKI Jakarta">DKI Jakarta</option>
                <option value="Jawa Barat">Jawa Barat</option>
                <option value="Jawa Tengah">Jawa Tengah</option>
                <option value="Jawa Timur">Jawa Timur</option>
                <option value="Banten">Banten</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Kota/Kabupaten</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Contoh: Jakarta Selatan"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Kecamatan</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Contoh: Senayan"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Lengkap</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Jalan, Nomor, Detail lokasi"
                required
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Kontak</h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor WhatsApp</label>
            <input
              type="tel"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="62812xxxxxxxx"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4 pt-6 border-t">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-4 rounded-lg transition"
          >
            {isLoading ? 'Sedang mengunggah...' : 'Pasang Iklan'}
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-4 rounded-lg transition"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}