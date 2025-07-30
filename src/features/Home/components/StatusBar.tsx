import React from 'react';
import styles from '../home.module.css';

const classes = styles || {} as Record<string, string>;

export default function StatusBar() {
  return (
    <div className={classes.statusBar}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className={classes.dot} style={{ backgroundColor: '#22c55e' }}></div>
          <span className={classes.statusText}>Versiyon: V.1.0.0.7</span>
        </div>
        <button className={classes.linkButton}>📄<span>Kullanıcı Dokümanı</span></button>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button className={classes.statusButton}>Ekranı Aç</button>
        <button className={classes.statusButton}>Ekranı Kapat</button>
      </div>
    </div>
  );
}
