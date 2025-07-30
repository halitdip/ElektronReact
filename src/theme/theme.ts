// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomColors {
    headerBackground: string;
    border: string;
    shadow: string;
    legendBoxBg: string;
    gradient: string[];
    wrapperBg: string;
    textColor: string;
    progressBarBg: string;
    leftPanelBg: string;
    logboxBg: string;
    statusbarBg: string;
    statusText: string;
    linkColor: string;
    statusButtonBg: string;
    statusButtonText: string;
  }
  interface Theme {
    customColors: CustomColors;
  }
  interface ThemeOptions {
    customColors?: Partial<CustomColors>;
  }
}


export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#27AE60' },
      background: {
        default: mode === 'dark' ? '#121212' : '#F2F2F2',
        paper: mode === 'dark' ? '#1F1F1F' : '#FFFFFF',
      },
      text: {
        primary: mode === 'dark' ? '#FFFFFF' : '#212121',
        secondary: '#A0A0A0',
      },
    },
    customColors: {
      headerBackground: mode === 'dark' ? '#121212' : '#ECECEC',
      border: mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
      shadow: mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.05)',
      legendBoxBg: mode === 'dark'
        ? 'rgba(30, 30, 40, 0.8)'
        : 'rgba(255,255,255,0.95)',
      gradient:
        mode === 'dark'
          ? ['#0f3443', '#19324c', '#105e62', '#27ae60']
          : ['#67e8f9', '#b9ffb7', '#a8ff78', '#27ae60'],
      wrapperBg: mode === 'dark' ? '#0f172a' : '#ffffff',
      textColor: mode === 'dark' ? '#f1f5f9' : '#1e293b',
      progressBarBg: mode === 'dark' ? '#1e293b' : '#e2e8f0',
      leftPanelBg: mode === 'dark' ? '#1e293b' : '#f8fafc',
      logboxBg: mode === 'dark' ? '#0f172a' : '#ffffff',
      statusbarBg: mode === 'dark' ? '#1e293b' : '#e5e7eb',
      statusText: mode === 'dark' ? '#cbd5e1' : '#475569',
      linkColor: mode === 'dark' ? '#38bdf8' : '#2563eb',
      statusButtonBg: mode === 'dark' ? '#334155' : '#e2e8f0',
      statusButtonText: mode === 'dark' ? '#f1f5f9' : '#1e293b',
    },
    typography: {
      fontFamily: ['TTForsRegular', 'sans-serif'].join(','),
      button: { textTransform: 'none' },
    },
  }) as unknown as import('@mui/material/styles').Theme;
