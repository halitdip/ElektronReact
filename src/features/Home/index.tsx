import React from 'react';
import { useTheme } from '@mui/material/styles';
import TitleBar from './components/TitleBar';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import StatusBar from './components/StatusBar';
import { useHome } from './useHome';
const styles = require('./home.module.css');

export default function Home() {
  const theme = useTheme();
  const { logs, handleSendFromTerminal, handleSendToTerminal } = useHome();

  const vars = {
    '--wrapper-bg':
      theme.palette.mode === 'dark'
        ? 'linear-gradient(to bottom right, #0f172a, #1e293b)'
        : 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
    '--text-color': theme.palette.text.primary,
    '--statusbar-bg': theme.palette.mode === 'dark' ? '#1e293b' : '#f1f5f9',
    '--status-text': theme.palette.mode === 'dark' ? '#cbd5e1' : '#1e293b',
    '--status-button-bg': theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1',
    '--status-button-text': theme.palette.mode === 'dark' ? '#e2e8f0' : '#1e293b',
    '--left-panel-bg':
      theme.palette.mode === 'dark'
        ? 'rgba(30, 41, 59, 0.5)'
        : 'rgba(226, 232, 240, 0.5)',
    '--logbox-bg':
      theme.palette.mode === 'dark'
        ? 'rgba(15, 23, 42, 0.7)'
        : 'rgba(255, 255, 255, 0.7)',
    '--progress-bar-bg': theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1',
    '--link-color': theme.palette.mode === 'dark' ? '#94a3b8' : '#1e293b',
  } as React.CSSProperties;

  return (
    <div className={styles.wrapper} style={vars}>
      <TitleBar />
      <div className={styles.content}>
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
