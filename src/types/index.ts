export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  phoneNumber?: string;
  profileImage?: string;
  bio?: string;
  role: 'USER' | 'AGENT' | 'ADMIN';
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  propertyType: 'RUMAH' | 'RUKO' | 'KONTRAKAN' | 'KOS_KOSAN' | 'APARTEMEN' | 'TANAH' | 'KANTOR';
  listingType: 'JUAL' | 'SEWA';
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  landArea?: number;
  buildArea?: number;
  province: string;
  city: string;
  district: string;
  village?: string;
  address: string;
  latitude: number;
  longitude: number;
  whatsappNumber?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'EXPIRED';
  views: number;
  isPremium: boolean;
  isFeatured: boolean;
  images: PropertyImage[];
  owner: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyImage {
  id: string;
  propertyId: string;
  url: string;
  caption?: string;
  order: number;
}

export interface Favorite {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  propertyId: string;
  rating: number;
  title: string;
  content: string;
  createdAt: Date;
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}