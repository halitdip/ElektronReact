import { useState } from 'react';
const { ipcRenderer } = require('electron');
import { copyPasteFile } from '../../hooks/useCopyPasteFile'

export function useHome() {
  const [logs, setLogs] = useState([
    { time: '14:29:56', message: 'Giriş İşlemleri Başarılı!', type: 'success' },
    { time: '14:29:56', message: 'Sistem sayım verisi alımına uygun!', type: 'info' },
  ]);

  const addLog = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const now = new Date();
    const time = now.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setLogs(prev => [...prev, { time, message, type }]);
  };

  const handleSendToTerminal = async () => {
    try {

      const source = 'C:/Terminal/Data/Template/SQLiteStoreTerminal.db';
      const target = 'C:/Terminal/MultiInv/Data/SQLiteStoreTerminal.db';
      const db = await copyPasteFile(source, target);
      console.log(db)
      addLog('Sayım Verisi AI ve Terminale gönderildi', 'success');

    } catch (error) {
      console.log(error)
    }

  };

  const handleSendFromTerminal = () => {
    addLog('Terminalden Verileri AI ye otomasyona gönderildi', 'info');
  };

  return {
    logs,
    addLog,
    handleSendToTerminal,
    handleSendFromTerminal,
  };
}
