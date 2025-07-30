import React from 'react';
import styles from './home.module.css';

// Fallback in case CSS modules fail to load
const classes = styles || {} as Record<string, string>;
import TitleBar from './components/TitleBar';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import StatusBar from './components/StatusBar';
import { useHome } from './useHome';

export default function Home() {
  const { logs, handleSendFromTerminal, handleSendToTerminal } = useHome();

  return (
    <div className={classes.wrapper}>
      <TitleBar />
      <div className={classes.content}>
        <LeftPanel
          onSendFromTerminal={handleSendFromTerminal}
          onSendToTerminal={handleSendToTerminal}
        />
        <RightPanel logs={logs} />
      </div>
      <StatusBar />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
