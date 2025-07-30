import React from 'react';
import { useTheme } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
const styles = require('../home.module.css');


export default function TitleBar() {
  const theme = useTheme();
  return (
    <div className={styles.progressBarBg}>
      <div
        className={styles.progressBarFill}
        style={{
          width: 26 + '%',
          background: `linear-gradient(to right, ${theme.customColors.gradient.join(", ")})`,
        }}
      ></div>
      <div className={styles.titleBar}>
        <div className={styles.title}>1.Sayım Aşaması (%26)</div>
        <div style={{ marginRight: 5, cursor: 'pointer' }}>
          <RefreshIcon />
        </div>
      </div>
    </div>
  );
}
