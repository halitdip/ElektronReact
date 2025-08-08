import { useState, useContext } from 'react';
import { copyPasteFile } from '../../hooks/useCopyPasteFile'
import { GetPartialInvProducts } from '../../services/main/TerminalServices'
import { AuthContext } from '../../context/AuthContext';

export function useHome() {
  const { setLoading } = useContext(AuthContext);
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
   /*    setLoading(true) */
      const source = 'C:/Terminal/Data/Template/SQLiteStoreTerminal.db';
      const target = 'C:/Terminal/MultiInv/Data/SQLiteStoreTerminal.db';
      const result = await copyPasteFile(source, target);
      if (result?.success) {

        const getData = await GetPartialInvProducts('F240');
        console.log(getData);
        console.log('DB başarıyla kopyalandı!')
      } else {
        console.error('Kopyalama başarısız:', result.message)
      }
/*       setLoading(false) */
    } catch (error) {
      console.log(error)
    } finally {
/*       setLoading(false) */
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
