'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white py-16 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Newsletter */}
        <div className="bg-emerald-600 rounded-3xl p-8 mb-16 text-center">
          <h3 className="text-3xl font-black mb-4">Dapatkan Update Properti Terbaru</h3>
          <p className="text-emerald-50 mb-6">Berlangganan newsletter kami untuk penawaran eksklusif dan tips properti</p>
          <form onSubmit={handleNewsletter} className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-bold transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div>
            <h4 className="text-2xl font-black text-emerald-400 mb-4">HUNiA</h4>
            <p className="text-gray-400 leading-relaxed mb-4">
              Platform marketplace properti terlengkap di Indonesia. Temukan rumah, ruko, kontrakan, dan kos-kosan impian Anda dengan mudah.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h5 className="font-bold text-lg mb-4">Navigasi</h5>
            <ul className="space-y-3 text-gray-400">
              <li><a href="/" className="hover:text-emerald-400 transition">Beranda</a></li>
              <li><a href="/search" className="hover:text-emerald-400 transition">Cari Properti</a></li>
              <li><a href="/upload" className="hover:text-emerald-400 transition">Pasang Iklan</a></li>
              <li><a href="/about" className="hover:text-emerald-400 transition">Tentang Kami</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-bold text-lg mb-4">Kategori</h5>
            <ul className="space-y-3 text-gray-400">
              <li><a href="/search?type=RUMAH" className="hover:text-emerald-400 transition">Rumah</a></li>
              <li><a href="/search?type=RUKO" className="hover:text-emerald-400 transition">Ruko</a></li>
              <li><a href="/search?type=KONTRAKAN" className="hover:text-emerald-400 transition">Kontrakan</a></li>
              <li><a href="/search?type=KOS_KOSAN" className="hover:text-emerald-400 transition">Kos-kosan</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-bold text-lg mb-4">Hubungi Kami</h5>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <a href="mailto:info@hunia.id" className="hover:text-emerald-400 transition">info@hunia.id</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <a href="tel:+6281200000000" className="hover:text-emerald-400 transition">+62 812 0000 0000</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-1" />
                <span>Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2026 HUNiA. Semua hak dilindungi.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-emerald-400 transition">Kebijakan Privasi</a>
            <a href="#" className="hover:text-emerald-400 transition">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-emerald-400 transition">Bantuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}