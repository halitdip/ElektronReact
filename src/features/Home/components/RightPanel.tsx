import React from 'react';
import styles from '../home.module.css';

const classes = styles || {} as Record<string, string>;

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
    <div className={classes.rightPanel}>
      <div className={classes.logBox}>
        <div className={classes.logList}>
          {logs.map((log, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px', animation: 'fade-in 0.3s ease-out' }}>
              <span className={classes.logTime}>{log.time}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className={classes.logDot} style={{ backgroundColor: log.type === 'success' ? '#22c55e' : log.type === 'error' ? '#ef4444' : '#3b82f6' }}></div>
                <span className={classes.logMessage}>{log.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
