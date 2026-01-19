import React from 'react';
import './DataTable.css';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onDelete?: (item: T) => void;
  loading?: boolean;
}

function DataTable<T extends { id: number }>({
  data,
  columns,
  onDelete,
  loading,
}: DataTableProps<T>) {
  if (loading) {
    return <div className="table-loading">Carregando...</div>;
  }

  if (data.length === 0) {
    return <div className="table-empty">Nenhum registro encontrado</div>;
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)}>{column.label}</th>
            ))}
            {onDelete && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={String(column.key)}>
                  {column.render
                    ? column.render(item)
                    : String(item[column.key as keyof T] || '-')}
                </td>
              ))}
              {onDelete && (
                <td>
                  <button
                    className="delete-button"
                    onClick={() => onDelete(item)}
                    title="Excluir"
                  >
                    🗑️
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
