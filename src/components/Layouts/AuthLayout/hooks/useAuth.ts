import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    // 实现登出逻辑
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  const isAuthenticated = useCallback(() => {
    return !!localStorage.getItem('token');
  }, []);

  return {
    handleLogout,
    isAuthenticated,
  };
};
