import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import styles from '../home.module.css';

const classes = styles || {} as Record<string, string>;

export default function TitleBar() {
  return (
    <div className={classes.progressBarBg}>
      <div className={classes.progressBarFill}></div>
      <div className={classes.titleBar}>
        <div className={classes.title}>1.Sayım Aşaması</div>
        <div style={{ marginRight: 5, cursor: 'pointer' }}>
          <RefreshIcon />
        </div>
      </div>
    </div>
  );
}
