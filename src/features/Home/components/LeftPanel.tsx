import React from 'react';
const styles = require('../home.module.css');

interface Props {
  onSendToTerminal: () => void;
  onSendFromTerminal: () => void;
}

export default function LeftPanel({ onSendToTerminal, onSendFromTerminal }: Props) {
  return (
    <div className={styles.leftPanel}>
      <button onClick={onSendToTerminal} className={styles.primaryButton}>
        <span style={{ fontWeight: 'bold' }}>⌨</span>
        <span className={styles.buttonText}>Sayım Verisi AI ve Terminale Gönder</span>
      </button>
      <button onClick={onSendFromTerminal} className={styles.secondaryButton}>
        <span style={{ fontWeight: 'bold' }}>🖥</span>
        <span className={styles.buttonText}>Terminalden Verileri AI ye Otomasyona Gönder</span>
      </button>
    </div>
  );
}
