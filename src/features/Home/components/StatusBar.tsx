import React, { useContext, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { ColorModeContext } from '../../../App';
import { startScrcpy, stopScrcpy } from '../../../hooks/useScrcpy';
import { getVersionHook } from '../../../hooks/useVersion'

const styles = require('../home.module.css');

export default function StatusBar() {
  const colorMode = useContext(ColorModeContext);
  const [version, setVersion] = useState<string>('');



  useEffect(() => {
    getVersion()
  }, []);

  const getVersion = async () => {
    const versions = await getVersionHook();
    setVersion(versions.version)
  }
  return (
    <div className={styles.statusBar}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className={styles.dot} style={{ backgroundColor: '#22c55e' }} />
          <span className={styles.statusText}>Versiyon: V.{version}</span>
        </div>
        <button className={styles.linkButton}>
          📄<span>Kullanıcı Dokümanı</span>
        </button>
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
        <button className={styles.statusButton} onClick={() => startScrcpy()}>
          Ekranı Aç
        </button>
        <button className={styles.statusButton} onClick={() => stopScrcpy()}>
          Ekranı Kapat
        </button>
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
