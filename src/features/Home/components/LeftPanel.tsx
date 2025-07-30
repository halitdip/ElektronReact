import React from 'react';
import styles from '../home.module.css';

const classes = styles || {} as Record<string, string>;

interface Props {
  onSendToTerminal: () => void;
  onSendFromTerminal: () => void;
}

export default function LeftPanel({ onSendToTerminal, onSendFromTerminal }: Props) {
  return (
    <div className={classes.leftPanel}>
      <button onClick={onSendToTerminal} className={classes.primaryButton}>
        <span style={{ fontWeight: 'bold' }}>⌨</span>
        <span className={classes.buttonText}>Sayım Verisi AI ve Terminale Gönder</span>
      </button>
      <button onClick={onSendFromTerminal} className={classes.secondaryButton}>
        <span style={{ fontWeight: 'bold' }}>🖥</span>
        <span className={classes.buttonText}>Terminalden Verileri AI ye Otomasyona Gönder</span>
      </button>
    </div>
  );
}
