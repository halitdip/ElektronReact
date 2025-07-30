// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';


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
    },
    typography: {
      fontFamily: ['TTForsRegular', 'sans-serif'].join(','),
      button: { textTransform: 'none' },
    },
  }) as any;
