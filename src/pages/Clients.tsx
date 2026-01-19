import React, { useEffect, useState } from 'react';
import { adminService } from '../services/admin.service';
import { ClientResponse } from '../types/api';
import DataTable from '../components/DataTable';
import './Clients.css';

const Clients: React.FC = () => {
  const [clients, setClients] = useState<ClientResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await adminService.getAllClients();
      setClients(data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadClients();
      return;
    }

    setLoading(true);
    try {
      const data = await adminService.searchClients(searchTerm);
      setClients(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (client: ClientResponse) => {
    if (!window.confirm(`Tem certeza que deseja excluir o cliente ${client.name}?`)) {
      return;
    }

    try {
      await adminService.deleteClient(client.id);
      setClients(clients.filter((c) => c.id !== client.id));
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      alert('Erro ao excluir cliente');
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'E-mail' },
    {
      key: 'phone',
      label: 'Telefone',
      render: (client: ClientResponse) => client.phone || '-',
    },
    {
      key: 'address',
      label: 'Cidade',
      render: (client: ClientResponse) =>
        client.address ? `${client.address.city}/${client.address.state}` : '-',
    },
    {
      key: 'createdAt',
      label: 'Cadastrado em',
      render: (client: ClientResponse) =>
        new Date(client.createdAt).toLocaleDateString('pt-BR'),
    },
  ];

  return (
    <div className="clients-page">
      <div className="page-header">
        <h1 className="page-title">Clientes</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            🔍 Buscar
          </button>
        </div>
      </div>

      <div className="info-bar">
        <span>Total: {clients.length} cliente(s)</span>
      </div>

      <DataTable
        data={clients}
        columns={columns}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default Clients;
