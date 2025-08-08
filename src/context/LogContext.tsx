import React, { createContext, useState, ReactNode, FC, useEffect } from 'react';

interface LogEntry {
  time: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface LogContextProps {
  logs: LogEntry[];
  addLog: (message: string, type?: 'success' | 'info' | 'error') => void;
  clearLogs: () => void;
}

export const LogContext = createContext<LogContextProps>({
  logs: [],
  addLog: () => {},
  clearLogs: () => {},
});

export const LogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOG_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLogs(parsed);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(logs));
    } catch {}
  }, [logs]);

  const addLog = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const now = new Date();
    const time = now.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setLogs(prev => [{ time, message, type }, ...prev].slice(0, 100));
  };

  const clearLogs = () => {
    setLogs([]);
    try {
      localStorage.removeItem(LOG_STORAGE_KEY);
    } catch {}
  };

  return (
    <LogContext.Provider value={{ logs, addLog, clearLogs }}>
      {children}
    </LogContext.Provider>
  );
};

export const LOG_STORAGE_KEY = 'app_logs_v1';

export const useLogs = () => React.useContext(LogContext);
