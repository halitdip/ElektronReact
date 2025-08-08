// src/context/AuthContext.tsx
import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from 'react';
import { registerLoadingCallbacks } from '../services/extension/loadingService';
import { loginService } from '../services/main/AuthServices';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (user?: any) => Promise<any>;
  checkLogin: (user?: any) => Promise<any>;
  logout: () => void;
  loading: boolean;
  setLoading: (status: boolean) => void;
  session: any;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  loading: false,
  login: async () => ({}),
  checkLogin: async () => ({}),
  logout: () => {},
  setLoading: () => {},
  session: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

const SESSION_KEY = 'app_session_v1';

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoadingState] = useState<boolean>(false);
  const [session, setSession] = useState<any>(null);
 
  useEffect(() => {
    registerLoadingCallbacks(
      () => setLoadingState(true),
      () => setLoadingState(false)
    );
  }, []);
 
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setSession(parsed);
        setIsAuthenticated(true);
      }
    } catch { 
      setSession(null);
      setIsAuthenticated(false);
    }
  }, []);
 
  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    } catch {
      console.log("storage problemi")
    }
  }, [session]);

  const checkLogin = async (user?: any) => {
    const res = await loginService(user);
    if (!res?.Login?.isError && res?.Login?.status === 200) {
      return { status: true, message: 'Başarılı!' };
    }
    return { status: false, message: res?.Login?.message || 'Bilinmeyen hata' };
  };

  const login = async (user?: any) => {
    const res = await loginService(user);
    if (!res?.Login?.isError && res?.Login?.status === 200) {
      const data = res?.Login?.data ?? null;
      setSession(data);
      setIsAuthenticated(true); 
      return { status: true, message: 'Giriş başarılı' };
    }
    return { status: false, message: res?.Login?.message || 'Giriş başarısız' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setSession(null);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {}
  };

  const setLoading = (status: boolean) => setLoadingState(status);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        checkLogin,
        logout,
        loading, 
        setLoading,
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
