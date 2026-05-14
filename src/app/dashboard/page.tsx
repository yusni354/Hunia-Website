'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [stats, setStats] = useState({
    totalProperties: 0,
    favoriteCount: 0,
    viewCount: 0,
  });

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        // This would call your API to get stats
        setStats({
          totalProperties: 5,
          favoriteCount: 12,
          viewCount: 245,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Akses Ditolak</h1>
            <p className="text-gray-600 mb-6">Anda harus login terlebih dahulu</p>
            <Link
              href="/login"
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-700 transition"
            >
              Masuk
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Selamat datang kembali, {user.fullName}! 👋</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <p className="text-gray-600 text-sm font-semibold mb-2">Total Properti</p>
            <p className="text-4xl font-black text-emerald-600">{stats.totalProperties}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <p className="text-gray-600 text-sm font-semibold mb-2">Properti Favorit</p>
            <p className="text-4xl font-black text-emerald-600">{stats.favoriteCount}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <p className="text-gray-600 text-sm font-semibold mb-2">Total Views</p>
            <p className="text-4xl font-black text-emerald-600">{stats.viewCount}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/upload"
            className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-bold mb-2">Pasang Iklan Baru</h3>
            <p className="text-emerald-50">Tambahkan properti baru ke katalog Anda</p>
          </Link>
          <Link
            href="/favorites"
            className="bg-white border-2 border-emerald-600 rounded-3xl p-8 hover:bg-emerald-50 transition"
          >
            <h3 className="text-2xl font-bold text-emerald-600 mb-2">Properti Favorit</h3>
            <p className="text-gray-600">Lihat properti yang Anda simpan</p>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}