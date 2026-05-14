import React from 'react';
import Link from 'next/link';
import { Heart, MapPin, Bed, Bath, Share2 } from 'lucide-react';
import { Property } from '@/types';
import { formatPrice } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const image = property.images[0]?.url;

  return (
    <Link href={`/property/${property.id}`}>
      <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative h-56 bg-gray-300 overflow-hidden group">
          {image ? (
            <img
              src={image}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">Tidak ada gambar</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="flex gap-2 flex-wrap">
              {property.isPremium && (
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                  ⭐ Premium
                </span>
              )}
              <span
                className={`${
                  property.listingType === 'JUAL'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-blue-100 text-blue-700'
                } px-3 py-1 rounded-full text-xs font-semibold`}
              >
                {property.listingType === 'JUAL' ? 'Dijual' : 'Disewa'}
              </span>
            </div>
            <button className="bg-white/80 hover:bg-white p-2 rounded-full transition">
              <Heart className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-gray-600 mb-4">
            <MapPin className="w-4 h-4" />
            <p className="text-sm">
              {property.city}, {property.province}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
            {property.description}
          </p>

          {/* Features */}
          <div className="flex gap-4 mb-4 text-sm text-gray-600 border-t pt-4">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms} Kamar</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms} Kamar Mandi</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div>
              <p className="text-2xl font-black text-emerald-600">
                {formatPrice(property.price)}
              </p>
              {property.listingType === 'SEWA' && (
                <p className="text-xs text-gray-500">/bulan</p>
              )}
            </div>
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold transition">
              Lihat
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}