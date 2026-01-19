import { apiClient } from '../config/api';
import { ClientResponse, ProfessionalResponse, BookingResponse } from '../types/api';

export const adminService = {
  // Clientes
  getAllClients: async (): Promise<ClientResponse[]> => {
    const response = await apiClient.get<ClientResponse[]>('/clients');
    return response.data;
  },

  getClientById: async (id: number): Promise<ClientResponse> => {
    const response = await apiClient.get<ClientResponse>(`/clients/${id}`);
    return response.data;
  },

  searchClients: async (name: string): Promise<ClientResponse[]> => {
    const response = await apiClient.get<ClientResponse[]>('/clients/search', {
      params: { name },
    });
    return response.data;
  },

  deleteClient: async (id: number): Promise<void> => {
    await apiClient.delete(`/clients/${id}`);
  },

  // Profissionais
  getAllProfessionals: async (): Promise<ProfessionalResponse[]> => {
    const response = await apiClient.get<ProfessionalResponse[]>('/professionals');
    return response.data;
  },

  getProfessionalById: async (id: number): Promise<ProfessionalResponse> => {
    const response = await apiClient.get<ProfessionalResponse>(`/professionals/${id}`);
    return response.data;
  },

  deleteProfessional: async (id: number): Promise<void> => {
    await apiClient.delete(`/professionals/${id}`);
  },

  // Agendamentos
  getAllBookings: async (params?: {
    clientId?: number;
    professionalId?: number;
    date?: string;
  }): Promise<BookingResponse[]> => {
    const response = await apiClient.get<BookingResponse[]>('/bookings', { params });
    return response.data;
  },

  getBookingById: async (id: number): Promise<BookingResponse> => {
    const response = await apiClient.get<BookingResponse>(`/bookings/${id}`);
    return response.data;
  },

  cancelBooking: async (id: number): Promise<void> => {
    await apiClient.delete(`/bookings/${id}`);
  },
};
