import React from 'react';
import importedStyles from '../home.module.css';
const styles = importedStyles ?? {} as Record<string, string>;

export default function StatusBar() {
  return (
    <div className={styles.statusBar}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className={styles.dot} style={{ backgroundColor: '#22c55e' }}></div>
          <span className={styles.statusText}>Versiyon: V.1.0.0.7</span>
        </div>
        <button className={styles.linkButton}>📄<span>Kullanıcı Dokümanı</span></button>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button className={styles.statusButton}>Ekranı Aç</button>
        <button className={styles.statusButton}>Ekranı Kapat</button>
      </div>
    </div>
  );
}
