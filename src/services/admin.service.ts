import { apiClient } from '../config/api';
import { ClientResponse, ProfessionalResponse, BookingResponse } from '../types/api';

export const adminService = {
  // Clientes
  getAllClients: async (): Promise<ClientResponse[]> => {
    try {
      console.log('[AdminService] Buscando clientes...');
      const response = await apiClient.get<ClientResponse[]>('/clients');
      console.log('[AdminService] Clientes recebidos:', response.data?.length || 0);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
      console.error('[AdminService] Erro ao buscar clientes:', error);
      console.error('[AdminService] Status:', error?.response?.status);
      console.error('[AdminService] Data:', error?.response?.data);
      throw error;
    }
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
    try {
      console.log('[AdminService] Buscando profissionais...');
      const response = await apiClient.get<ProfessionalResponse[]>('/professionals');
      console.log('[AdminService] Profissionais recebidos:', response.data?.length || 0);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
      console.error('[AdminService] Erro ao buscar profissionais:', error);
      console.error('[AdminService] Status:', error?.response?.status);
      console.error('[AdminService] Data:', error?.response?.data);
      throw error;
    }
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
    try {
      console.log('[AdminService] Buscando agendamentos...', params);
      const response = await apiClient.get<BookingResponse[]>('/bookings', { params });
      console.log('[AdminService] Agendamentos recebidos:', response.data?.length || 0);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
      console.error('[AdminService] Erro ao buscar agendamentos:', error);
      console.error('[AdminService] Status:', error?.response?.status);
      console.error('[AdminService] Data:', error?.response?.data);
      throw error;
    }
  },

  getBookingById: async (id: number): Promise<BookingResponse> => {
    const response = await apiClient.get<BookingResponse>(`/bookings/${id}`);
    return response.data;
  },

  cancelBooking: async (id: number): Promise<void> => {
    await apiClient.delete(`/bookings/${id}`);
  },
};
