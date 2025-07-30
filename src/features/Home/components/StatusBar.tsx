import React, { useContext } from 'react';
import Switch from '@mui/material/Switch';
import { ColorModeContext } from '../../../App';
const styles = require('../home.module.css');

export default function StatusBar() {
  const colorMode = useContext(ColorModeContext);
  const version = React.useMemo(() => {
    try {
      const remote = window.require('@electron/remote');
      return remote.app.getVersion();
    } catch {
      return '';
    }
  }, []);

  return (
    <div className={styles.statusBar}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className={styles.dot} style={{ backgroundColor: '#22c55e' }}></div>
          <span className={styles.statusText}>Versiyon: V.{version}</span>
        </div>
        <button className={styles.linkButton}>📄<span>Kullanıcı Dokümanı</span></button>
        <Switch
          size="small"
          checked={colorMode.mode === 'dark'}
          onChange={colorMode.toggleColorMode}
        />
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button className={styles.statusButton}>Ekranı Aç</button>
        <button className={styles.statusButton}>Ekranı Kapat</button>
      </div>
    </div>
  );
}
