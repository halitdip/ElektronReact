import { useState, useContext } from 'react';
import { copyPasteFile } from '../../hooks/useFiles'
import { GetPartialInvProducts } from '../../services/main/TerminalServices'
import { AuthContext } from '../../context/AuthContext';
import { insertInventory } from './hooks/useDb'
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

    // todo : storeterminalInv -> mainwindow.xaml.cs
    // bs envanter uygulamasının ve android apk nın versiyonu kontrol edilecek. servisten 246
    // bu alerta evet derse devam .İşlem sırasında kullanılan tüm terminallerdeki veriler sıfırlanacaktır. Onaylıyor musunuz?
    // adb de birden fazla cihaz bağlıysa uyarı ver ve devam etme. 270. satır
    // yapıştırcağım konumda dosya yoksa dosya yolunu oluştur içine kopyala
    // kopyaladığımız yerde db varsa onu backup dosyasına taşı _günayyılsaatdakikasaniye
    //  UpdateBtnByStatus = 1123
    // InventoryType ve InventorySubType i servisten al globale yaz diğer apilere göndercez 299

    try {
      setLoading(true)
      const source = 'C:/Terminal/Data/Template/SQLiteStoreTerminal.db';
      const target = 'C:/Terminal/MultiInv/Data/SQLiteStoreTerminal.db';
      const result = await copyPasteFile(source, target);
      if (result?.success) {

        const getData = await GetPartialInvProducts('F240');
        if (!getData?.GetPartialInvProducts?.isError) {
          addLog('Veri başarıyla Alındı !', 'success');

          const insertRes = await insertInventory(target, getData?.GetPartialInvProducts?.data)
          if (insertRes.success) {
            addLog('Veri başarıyla DB’ye yazıldı!', 'success');
          } else {
            addLog(`DB yazma hatası: ${insertRes.message}`, 'error');
          }
        } else {
          addLog(`Veri Alma hatası`, 'error');

        }

        console.log(getData);
        console.log('DB başarıyla kopyalandı!')
      } else {
        console.error('Kopyalama başarısız:', result.message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
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
