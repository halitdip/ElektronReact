// src/context/AuthContext.tsx
import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useEffect
} from 'react';
// Relative path ile import edin, projenizde @ alias’ı çalışmıyorsa:
import { registerLoadingCallbacks } from '../services/extension/loadingService';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  loading: boolean;
  setLoading: (status: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  loading: false,
  login: () => {},
  logout: () => {},
  setLoading: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoadingState] = useState<boolean>(false);

  // loadingService’a gerçek callback’leri buradan kaydediyoruz
  useEffect(() => {
    registerLoadingCallbacks(
      () => setLoadingState(true),
      () => setLoadingState(false)
    );
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const setLoading = (status: boolean) => {
    setLoadingState(status);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
