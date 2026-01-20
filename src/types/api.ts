export interface ClientResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: AddressResponse;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfessionalResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: AddressResponse;
  avatarUrl?: string;
  bio?: string;
  specialtyIds?: number[];
  rating?: number;
  totalReviews?: number;
  specialization?: string;
  workStartTime: string; // HH:mm format
  workEndTime: string; // HH:mm format
  workingDays: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BookingResponse {
  id: number;
  clientId: number;
  professionalId: number;
  serviceId: number;
  serviceName?: string;
  serviceCategory?: string;
  priceCents?: number;
  startAt: string; // ISO 8601 format (LocalDateTime from API)
  endAt: string; // ISO 8601 format (LocalDateTime from API)
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  addressId?: number;
  notes?: string;
  createdAt: string;
}

export interface AddressResponse {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  role: string;
  ownerId: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
