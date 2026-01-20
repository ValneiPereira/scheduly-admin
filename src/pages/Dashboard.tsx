import React, { useEffect, useState } from 'react';
import { adminService } from '../services/admin.service';
import './Dashboard.css';

interface Stats {
  totalClients: number;
  totalProfessionals: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalClients: 0,
    totalProfessionals: 0,
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setError(null);
    try {
      console.log('[Dashboard] Carregando estatísticas...');
      
      const [clients, professionals, bookings] = await Promise.all([
        adminService.getAllClients().catch(err => {
          console.error('[Dashboard] Erro ao buscar clientes:', err);
          return [];
        }),
        adminService.getAllProfessionals().catch(err => {
          console.error('[Dashboard] Erro ao buscar profissionais:', err);
          return [];
        }),
        adminService.getAllBookings().catch(err => {
          console.error('[Dashboard] Erro ao buscar agendamentos:', err);
          return [];
        }),
      ]);

      console.log('[Dashboard] Dados recebidos:', {
        clients: Array.isArray(clients) ? clients.length : 0,
        professionals: Array.isArray(professionals) ? professionals.length : 0,
        bookings: Array.isArray(bookings) ? bookings.length : 0,
      });

      const bookingsArray = Array.isArray(bookings) ? bookings : [];
      const pendingBookings = bookingsArray.filter((b) => b.status === 'PENDING').length;
      const confirmedBookings = bookingsArray.filter((b) => b.status === 'CONFIRMED').length;
      const cancelledBookings = bookingsArray.filter((b) => b.status === 'CANCELLED').length;

      setStats({
        totalClients: Array.isArray(clients) ? clients.length : 0,
        totalProfessionals: Array.isArray(professionals) ? professionals.length : 0,
        totalBookings: bookingsArray.length,
        pendingBookings,
        confirmedBookings,
        cancelledBookings,
      });
    } catch (error: any) {
      console.error('[Dashboard] Erro ao carregar estatísticas:', error);
      console.error('[Dashboard] Detalhes do erro:', {
        message: error?.message,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data,
        url: error?.config?.url,
      });
      
      const errorMessage = error?.response?.data?.message 
        || error?.message 
        || 'Erro ao carregar estatísticas. Verifique o console para mais detalhes.';
      
      setError(errorMessage);
      
      // Se for erro de autenticação, o interceptor já redireciona
      // Mas vamos garantir que não fique em loading infinito
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        console.log('[Dashboard] Erro de autenticação - redirecionando para login');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      {error && (
        <div style={{ 
          padding: '16px', 
          marginBottom: '20px', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px',
          color: '#c33'
        }}>
          <strong>Erro:</strong> {error}
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-label">Total de Clientes</div>
            <div className="stat-value">{stats.totalClients}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <div className="stat-content">
            <div className="stat-label">Total de Profissionais</div>
            <div className="stat-value">{stats.totalProfessionals}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-label">Total de Agendamentos</div>
            <div className="stat-value">{stats.totalBookings}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-label">Pendentes</div>
            <div className="stat-value">{stats.pendingBookings}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-label">Confirmados</div>
            <div className="stat-value">{stats.confirmedBookings}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">❌</div>
          <div className="stat-content">
            <div className="stat-label">Cancelados</div>
            <div className="stat-value">{stats.cancelledBookings}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
