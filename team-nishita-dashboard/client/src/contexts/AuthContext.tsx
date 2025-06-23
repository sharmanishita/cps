import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode as ReactNode } from 'react'
import { getCurrentUser, logout as apiLogout } from '../api/api';

interface User {
  username: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    apiLogout();
  };

  const value: AuthContextType = {
    user,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    loading
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
