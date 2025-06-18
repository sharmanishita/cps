import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getCurrentUser, logout } from '../api'

interface User {
  username: string;
  role: 'user' | 'admin';
};


interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

interface AuthProviderProps {
  childeren: ReactNode;
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
  }

  const handleLogout = () => {
    setUser(null);
    logout();
  }

  const value = {
    user,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user'
  }

  if (loading) {
    return <div>Loading...</div>
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
