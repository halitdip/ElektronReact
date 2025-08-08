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

  const cssVars: React.CSSProperties = {
    '--wrapper-bg': theme.customColors.wrapperBg,
    '--text-color': theme.customColors.textColor,
    '--progress-bar-bg': theme.customColors.progressBarBg,
    '--left-panel-bg': theme.customColors.leftPanelBg,
    '--logbox-bg': theme.customColors.logboxBg,
    '--statusbar-bg': theme.customColors.statusbarBg,
    '--status-text': theme.customColors.statusText,
    '--link-color': theme.customColors.linkColor,
    '--status-button-bg': theme.customColors.statusButtonBg,
    '--status-button-text': theme.customColors.statusButtonText,
  } as React.CSSProperties;

  return (
    <div className={styles.wrapper} style={cssVars}>
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
