import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import importedStyles from '../home.module.css';
const styles = importedStyles ?? {} as Record<string, string>;

export default function TitleBar() {
  return (
    <div className={styles.progressBarBg}>
      <div className={styles.progressBarFill}></div>
      <div className={styles.titleBar}>
        <div className={styles.title}>1.Sayım Aşaması</div>
        <div style={{ marginRight: 5, cursor: 'pointer' }}>
          <RefreshIcon />
        </div>
      </div>
    </div>
  );
}
