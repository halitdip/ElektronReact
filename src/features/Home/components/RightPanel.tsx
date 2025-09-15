import React from 'react';
import styles from '../home.module.css';

interface Log {
  time: string;
  message: string;
  type: string;
}

interface Props {
  logs: Log[];
}

export default function RightPanel({ logs }: Props) {
  return (
    <div className={styles.rightPanel}>
      <div className={styles.logBox}>
        <div className={styles.logList}>
          {logs.map((log, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px', animation: 'fade-in 0.3s ease-out' }}>
              <span className={styles.logTime}>{log.time}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className={styles.logDot} style={{ backgroundColor: log.type === 'success' ? '#22c55e' : log.type === 'error' ? '#ef4444' : '#3b82f6' }}></div>
                <span className={styles.logMessage}>{log.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
