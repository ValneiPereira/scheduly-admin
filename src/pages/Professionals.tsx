import React, { useEffect, useState } from 'react';
import { adminService } from '../services/admin.service';
import { ProfessionalResponse } from '../types/api';
import DataTable from '../components/DataTable';
import './Professionals.css';

const Professionals: React.FC = () => {
  const [professionals, setProfessionals] = useState<ProfessionalResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfessionals();
  }, []);

  const loadProfessionals = async () => {
    try {
      const data = await adminService.getAllProfessionals();
      setProfessionals(data);
    } catch (error) {
      console.error('Erro ao carregar profissionais:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (professional: ProfessionalResponse) => {
    if (
      !window.confirm(
        `Tem certeza que deseja excluir o profissional ${professional.name}?`
      )
    ) {
      return;
    }

    try {
      await adminService.deleteProfessional(professional.id);
      setProfessionals(professionals.filter((p) => p.id !== professional.id));
    } catch (error) {
      console.error('Erro ao excluir profissional:', error);
      alert('Erro ao excluir profissional');
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'E-mail' },
    { key: 'phone', label: 'Telefone' },
    {
      key: 'active',
      label: 'Status',
      render: (professional: ProfessionalResponse) => (
        <span className={professional.active ? 'status-active' : 'status-inactive'}>
          {professional.active ? '✅ Ativo' : '❌ Inativo'}
        </span>
      ),
    },
    {
      key: 'workingDays',
      label: 'Dias de Trabalho',
      render: (professional: ProfessionalResponse) =>
        professional.workingDays?.join(', ') || '-',
    },
    {
      key: 'workStartTime',
      label: 'Horário',
      render: (professional: ProfessionalResponse) =>
        `${professional.workStartTime} - ${professional.workEndTime}`,
    },
    {
      key: 'address',
      label: 'Cidade',
      render: (professional: ProfessionalResponse) =>
        professional.address
          ? `${professional.address.city}/${professional.address.state}`
          : '-',
    },
  ];

  return (
    <div className="professionals-page">
      <div className="page-header">
        <h1 className="page-title">Profissionais</h1>
      </div>

      <div className="info-bar">
        <span>Total: {professionals.length} profissional(is)</span>
      </div>

      <DataTable
        data={professionals}
        columns={columns}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default Professionals;
