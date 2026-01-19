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
  cpf: string;
  address?: AddressResponse;
  bio?: string;
  avatarUrl?: string;
  workStartTime: string;
  workEndTime: string;
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
  date: string;
  startTime: string;
  endTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  notes?: string;
  createdAt: string;
  updatedAt: string;
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
