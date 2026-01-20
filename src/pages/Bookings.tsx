import React, { useEffect, useState } from 'react';
import { adminService } from '../services/admin.service';
import { BookingResponse } from '../types/api';
import DataTable from '../components/DataTable';
import './Bookings.css';

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'PENDING' | 'CONFIRMED' | 'CANCELLED'>('all');

  useEffect(() => {
    loadBookings();
  }, [filter]);

  const loadBookings = async () => {
    try {
      const data = await adminService.getAllBookings();
      let filtered = data;

      if (filter !== 'all') {
        filtered = data.filter((b) => b.status === filter);
      }

      setBookings(filtered);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (booking: BookingResponse) => {
    if (!window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      return;
    }

    try {
      await adminService.cancelBooking(booking.id);
      setBookings(bookings.filter((b) => b.id !== booking.id));
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      alert('Erro ao cancelar agendamento');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { text: string; className: string }> = {
      PENDING: { text: '⏳ Pendente', className: 'badge-pending' },
      CONFIRMED: { text: '✅ Confirmado', className: 'badge-confirmed' },
      CANCELLED: { text: '❌ Cancelado', className: 'badge-cancelled' },
      COMPLETED: { text: '✓ Concluído', className: 'badge-completed' },
    };

    const badge = badges[status] || { text: status, className: 'badge-default' };
    return <span className={`badge ${badge.className}`}>{badge.text}</span>;
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'clientId', label: 'ID Cliente' },
    { key: 'professionalId', label: 'ID Profissional' },
    { key: 'serviceId', label: 'ID Serviço' },
    {
      key: 'date',
      label: 'Data',
      render: (booking: BookingResponse) =>
        new Date(booking.startAt).toLocaleDateString('pt-BR'),
    },
    {
      key: 'startTime',
      label: 'Horário',
      render: (booking: BookingResponse) => {
        const startTime = new Date(booking.startAt).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        });
        const endTime = new Date(booking.endAt).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        });
        return `${startTime} - ${endTime}`;
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (booking: BookingResponse) => getStatusBadge(booking.status),
    },
    {
      key: 'createdAt',
      label: 'Criado em',
      render: (booking: BookingResponse) =>
        new Date(booking.createdAt).toLocaleDateString('pt-BR'),
    },
  ];

  return (
    <div className="bookings-page">
      <div className="page-header">
        <h1 className="page-title">Agendamentos</h1>
        <div className="filter-buttons">
          <button
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button
            className={`filter-button ${filter === 'PENDING' ? 'active' : ''}`}
            onClick={() => setFilter('PENDING')}
          >
            Pendentes
          </button>
          <button
            className={`filter-button ${filter === 'CONFIRMED' ? 'active' : ''}`}
            onClick={() => setFilter('CONFIRMED')}
          >
            Confirmados
          </button>
          <button
            className={`filter-button ${filter === 'CANCELLED' ? 'active' : ''}`}
            onClick={() => setFilter('CANCELLED')}
          >
            Cancelados
          </button>
        </div>
      </div>

      <div className="info-bar">
        <span>Total: {bookings.length} agendamento(s)</span>
      </div>

      <DataTable
        data={bookings}
        columns={columns}
        onDelete={filter === 'all' || filter === 'PENDING' ? handleCancel : undefined}
        loading={loading}
      />
    </div>
  );
};

export default Bookings;
