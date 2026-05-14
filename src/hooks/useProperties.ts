import { useState, useCallback } from 'react';
import { Property, PaginationResponse } from '@/types';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    total: 0,
    totalPages: 0,
  });

  const fetchProperties = useCallback(
    async (page: number = 1, filters?: Record<string, any>) => {
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
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch properties');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { properties, isLoading, error, pagination, fetchProperties };
};