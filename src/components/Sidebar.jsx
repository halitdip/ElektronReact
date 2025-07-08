import React from 'react';
const { exec } = window.require('child_process');
const os = window.require('os');
import { NavLink } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import HomeIcon from '@mui/icons-material/Home';
import UpdateIcon from '@mui/icons-material/Update';
import ListIcon from '@mui/icons-material/List';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import RefreshIcon from '@mui/icons-material/Refresh';

import ReactLogo from '@/assets/img/a-101-logo.png';

const NavItem = styled(NavLink)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(3),
  color: '#AAE8F0',
  textDecoration: 'none',
  transition: 'color 0.2s',
  '&:hover': {
    color: '#fff',
  },
  '&.active': {
    color: '#fff',
  },
}));

const ActionBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  alignItems: 'center',
}));

const ActionButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: '#fff',
  minWidth: 64,
  cursor: 'pointer',
  '&:hover': {
    color: '#AAE8F0',
  },
}));

export default function TopNav() {
  const theme = useTheme();

  // Fonksiyonlar
  const handleShutdown = () => {
    const platform = os.platform();
    let cmd;
    if (platform === 'win32') {
      cmd = 'shutdown /s /t 0';
    } else if (platform === 'darwin') {
      cmd = "osascript -e 'tell app \"System Events\" to shut down'";
    } else {
      cmd = 'shutdown -h now';
    }
    exec(cmd, err => {
      if (err) console.error('Shutdown failed:', err);
    });
  };
  const handleRestart = () => {
    const platform = os.platform();
    let cmd;
    if (platform === 'win32') {
      cmd = 'shutdown /r /t 0';
    } else if (platform === 'darwin') {
      cmd = "osascript -e 'tell app \"System Events\" to restart'";
    } else {
      cmd = 'shutdown -r now';
    }
    exec(cmd, err => {
      if (err) console.error('Restart failed:', err);
    });
  };
  const handleSwitchUser = () => {
    const platform = os.platform();
    let cmd;
    if (platform === 'win32') {
      cmd = 'tsdiscon';
    } else if (platform === 'darwin') {
      cmd = '/System/Library/CoreServices/Menu\\ Extras/User.menu/Contents/Resources/CGSession -suspend';
    } else {
      cmd = 'dm-tool switch-to-greeter';
    }
    exec(cmd, err => {
      if (err) console.error('Switch user failed:', err);
    });
  };
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#00a1cb',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          px: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <IconButton size="small" disableRipple sx={{ mr: 1 }}>
          <img
            src={ReactLogo}
            alt="Logo"
            style={{ height: 35, border: '3px solid #fff', borderRadius: 4 }}
          />
        </IconButton>

        {/* Menü Öğeleri */}
        <Box sx={{ display: 'flex' }}>
          <NavItem to="/">
            <IconButton size="small" color="inherit">
              <HomeIcon fontSize="small" />
            </IconButton>
            <Typography
              variant="button"
              sx={{ textTransform: 'none', ml: 0.5 }}
            >
              Ana Sayfa
            </Typography>
          </NavItem>
          <NavItem to="/about">
            <IconButton size="small" color="inherit">
              <UpdateIcon fontSize="small" />
            </IconButton>
            <Typography
              variant="button"
              sx={{ textTransform: 'none', ml: 0.5 }}
            >
              Hakkımızda
            </Typography>
          </NavItem>
          <NavItem to="/info">
            <IconButton size="small" color="inherit">
              <ListIcon fontSize="small" />
            </IconButton>
            <Typography
              variant="button"
              sx={{ textTransform: 'none', ml: 0.5 }}
            >
              Bilgiler
            </Typography>
          </NavItem>
        </Box>

        {/* Sağdaki İşlem Butonları */}
        <ActionBox>
          <ActionButton onClick={handleShutdown}>
            <IconButton size="large" color="inherit">
              <PowerSettingsNewIcon />
            </IconButton>
            <Typography variant="caption">Kapat</Typography>
          </ActionButton>
          <ActionButton onClick={handleRestart}>
            <IconButton size="large" color="inherit">
              <RestartAltIcon />
            </IconButton>
            <Typography variant="caption">Yeniden Başlat</Typography>
          </ActionButton>
          <ActionButton onClick={handleSwitchUser}>
            <IconButton size="large" color="inherit">
              <SwitchAccountIcon />
            </IconButton>
            <Typography variant="caption">Kullanıcı Değiştir</Typography>
          </ActionButton>
          <ActionButton onClick={handleRefresh}>
            <IconButton size="large" color="inherit">
              <RefreshIcon />
            </IconButton>
            <Typography variant="caption">Yenile</Typography>
          </ActionButton>
        </ActionBox>
      </Toolbar>
    </AppBar>
  );
}
