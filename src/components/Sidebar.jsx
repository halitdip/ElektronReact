import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import ReactLogo from '@/assets/img/a-101-logo.png';

import CancelIcon from '@mui/icons-material/Cancel';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

export default function TopNav() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleClose = () => {
    const remote = window.require('@electron/remote');
    const win = remote.getCurrentWindow ? remote.getCurrentWindow() : remote.BrowserWindow.getFocusedWindow();
    if (win) {
      win.removeAllListeners && win.removeAllListeners('close');
      win.close();
    }
  };

  const handleMinimize = () => {
    const remote = window.require('@electron/remote');
    const win = remote.getCurrentWindow ? remote.getCurrentWindow() : remote.BrowserWindow.getFocusedWindow();
    if (win) win.minimize();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.left}>
        <IconButton size="small" disableRipple>
          <img
            src={ReactLogo}
            alt="Logo"
            style={{ height: 25, border: '3px solid #fff', borderRadius: 4 }}
          />
        </IconButton>
      </div>
      <div style={{ color: 'white', fontSize: 12,marginLeft: 70 }}>
        B5954 - Kışla Sancaktepe İstanbul
      </div>
      <div style={styles.right}>

        <IconButton size="small" sx={{ color: 'white' }} title="Çıkış Yap" onClick={handleLogout}>
          <ExitToAppIcon fontSize="small" />
        </IconButton>

        <IconButton size="small" sx={{ color: 'white' }} title="Küçült" onClick={handleMinimize}>
          <IndeterminateCheckBoxIcon fontSize="small" />
        </IconButton>

        <IconButton size="small" sx={{ color: 'white' }} title="Kapat" onClick={handleClose}>
          <CancelIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    background: 'linear-gradient(to right, #1e293b, #334155)',
    height: 35,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10px',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
};
