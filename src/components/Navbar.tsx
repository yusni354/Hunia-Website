'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useAuth();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <h1 className="text-3xl font-black tracking-tight text-emerald-600">
            HUNiA
          </h1>
          <p className="text-xs text-gray-500">Pencarian Sewa dan Jual Beli</p>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 font-medium items-center">
          <Link href="/" className="hover:text-emerald-600 transition">
            Beranda
          </Link>
          <Link href="/search" className="hover:text-emerald-600 transition">
            Cari Properti
          </Link>
          <Link href="/upload" className="hover:text-emerald-600 transition">
            Pasang Iklan
          </Link>
          <Link href="/about" className="hover:text-emerald-600 transition">
            Tentang
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          {!isLoading && !user ? (
            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-emerald-600 font-medium transition"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-semibold transition"
              >
                Daftar
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-700 hover:text-emerald-600 font-medium">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition"
              >
                <LogOut className="w-5 h-5" />
                Keluar
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4">
          <Link href="/" className="hover:text-emerald-600">
            Beranda
          </Link>
          <Link href="/search" className="hover:text-emerald-600">
            Cari Properti
          </Link>
          <Link href="/upload" className="hover:text-emerald-600">
            Pasang Iklan
          </Link>
          <Link href="/about" className="hover:text-emerald-600">
            Tentang
          </Link>
          <hr />
          {!isLoading && !user ? (
            <>
              <Link href="/login" className="text-emerald-600 font-semibold">
                Masuk
              </Link>
              <Link
                href="/register"
                className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-semibold text-center"
              >
                Daftar
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="font-semibold">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-red-600 text-left font-semibold">
                Keluar
              </button>
            </>
          )}
        </nav>
      )}
    </header>
  );
}