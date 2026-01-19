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

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [clients, professionals, bookings] = await Promise.all([
        adminService.getAllClients(),
        adminService.getAllProfessionals(),
        adminService.getAllBookings(),
      ]);

      const pendingBookings = bookings.filter((b) => b.status === 'PENDING').length;
      const confirmedBookings = bookings.filter((b) => b.status === 'CONFIRMED').length;
      const cancelledBookings = bookings.filter((b) => b.status === 'CANCELLED').length;

      setStats({
        totalClients: clients.length,
        totalProfessionals: professionals.length,
        totalBookings: bookings.length,
        pendingBookings,
        confirmedBookings,
        cancelledBookings,
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
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
