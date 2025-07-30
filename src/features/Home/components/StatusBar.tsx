import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
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

      </div>
      <div style={{ display: 'flex', gap: '8px',justifyContent: 'flex-end', alignItems: 'center' }}>
        <button className={styles.statusButton}>Ekranı Aç</button>
        <button className={styles.statusButton}>Ekranı Kapat</button>

        <IconButton size="small" onClick={colorMode.toggleColorMode}>
          {colorMode.mode === 'dark' ? (
            <Brightness7Icon fontSize="small" />
          ) : (
            <Brightness4Icon fontSize="small" />
          )}
        </IconButton>
      </div>
    </div>
  );
}
