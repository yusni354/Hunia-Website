'use client';

import React, { useState, useEffect } from 'react';
import { Property, PaginationResponse } from '@/types';
import { PropertyCard } from '@/components/PropertyCard';
import { Loader2 } from 'lucide-react';

interface PropertyGridProps {
  filters?: Record<string, any>;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({ filters = {} }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          pageSize: '12',
          ...filters,
        });

        const response = await fetch(`/api/properties?${queryParams}`);
        const data: PaginationResponse<Property> = await response.json();
        setProperties(data.data);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [page, filters]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Tidak ada properti ditemukan</h3>
        <p className="text-gray-600">Coba ubah filter pencarian Anda</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Sebelumnya
          </button>
          <span className="text-gray-600">
            Halaman {pagination.page} dari {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
            disabled={page === pagination.totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Selanjutnya
          </button>
        </div>
      )}
    </>
  );
}