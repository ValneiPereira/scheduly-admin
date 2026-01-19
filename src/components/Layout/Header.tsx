import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Painel Administrativo</h1>
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;
