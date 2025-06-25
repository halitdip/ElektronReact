// components/TopNav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import HomeIcon from '@mui/icons-material/Home';
import UpdateIcon from '@mui/icons-material/Update';
import ListIcon from '@mui/icons-material/List';

import ReactLogo from '@/assets/img/a-101-logo.png';

const NavItem = styled(NavLink)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(3),
  color: theme.palette.grey[400],
  textDecoration: 'none',
  transition: 'color 0.2s',
  '&:hover': {
    color: '#fff',
  },
  '&.active': {
    color: '#fff',
    // opsiyonel alt çizgi:
    // borderBottom: `2px solid ${theme.palette.common.white}`,
  },
}));

export default function TopNav() {
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#00a1cb', boxShadow: 'none' }}>
      <Toolbar disableGutters sx={{ minHeight: 64, px: 2 }}>
        {/* Logo */}
        <NavItem to="/">
          <IconButton size="small" disableRipple sx={{ mr: 1 }}>
            <img
              src={ReactLogo}
              alt="Logo"
              style={{ height: 35, border: '3px solid #fff', borderRadius: 4 }}
            />
          </IconButton>
        </NavItem>

        {/* Menü Öğeleri */}
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <NavItem to="/">
            <IconButton size="small" color="inherit"><HomeIcon fontSize="small" /></IconButton>
            <Typography variant="button" sx={{ textTransform: 'none', ml: 0.5 }}>
              Ana Sayfa
            </Typography>
          </NavItem>

          <NavItem to="/about">
            <IconButton size="small" color="inherit"><UpdateIcon fontSize="small" /></IconButton>
            <Typography variant="button" sx={{ textTransform: 'none', ml: 0.5 }}>
              Hakkımızda
            </Typography>
          </NavItem>

          <NavItem to="/info">
            <IconButton size="small" color="inherit"><ListIcon fontSize="small" /></IconButton>
            <Typography variant="button" sx={{ textTransform: 'none', ml: 0.5 }}>
              Bilgiler
            </Typography>
          </NavItem>
        </Box>
 
      </Toolbar>
    </AppBar>
  );
}
