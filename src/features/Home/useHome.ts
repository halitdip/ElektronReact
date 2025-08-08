import { useContext } from 'react';
import { copyPasteFile } from '../../hooks/useFiles'
import { GetPartialInvProducts } from '../../services/main/TerminalServices'
import { AuthContext } from '../../context/AuthContext';
import { insertInventoryHook } from '../../hooks/useDb'
import { preflight } from './helpers/terminalFlow'
import { useLogs } from '../../context/LogContext';
export function useHome() {
  const { setLoading } = useContext(AuthContext);
  const { logs, addLog } = useLogs();

  const handleSendToTerminal = async () => {

    try {
      setLoading(true)
      // todo : storeterminalInv -> mainwindow.xaml.cs
      //İşlem sırasında kullanılan tüm terminallerdeki veriler sıfırlanacaktır. Onaylıyor musunuz?  bu alerta evet derse devam (yapıldı)
      // bs envanter uygulamasının ve android apk nın versiyonu kontrol edilecek. servisten 246 

      // adb de birden fazla cihaz bağlıysa uyarı ver ve devam etme. 270. satır
      // yapıştırcağım konumda dosya yoksa dosya yolunu oluştur içine kopyala
      // kopyaladığımız yerde db varsa onu backup dosyasına taşı _günayyılsaatdakikasaniye
      //  UpdateBtnByStatus = 1123
      // InventoryType ve InventorySubType i servisten al globale yaz diğer apilere göndercez 299


      const canContinue = await preflight(addLog);
      console.log(canContinue);
      if (!canContinue.status) {
        addLog(canContinue.message, 'error');
        return;
      }
      setLoading(true)
      const source = 'C:/Terminal/Data/Template/SQLiteStoreTerminal.db';
      const target = 'C:/Terminal/MultiInv/Data/SQLiteStoreTerminal.db';
      const result = await copyPasteFile(source, target);
      if (result?.success) {

        const getData = await GetPartialInvProducts('F240');
        if (!getData?.GetPartialInvProducts?.isError) {
          addLog('Veri başarıyla Alındı !', 'success');

          const insertRes = await insertInventoryHook(target, getData?.GetPartialInvProducts?.data)
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
    handleSendToTerminal,
    handleSendFromTerminal,
  };
}
