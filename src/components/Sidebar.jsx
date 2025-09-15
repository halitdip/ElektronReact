import React from 'react';
import IconButton from '@mui/material/IconButton';
import ReactLogo from '@/assets/img/a-101-logo.png';

import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Minimize';
import LogoutIcon from '@mui/icons-material/Logout';

export default function TopNav() {
  return (
    <div style={styles.wrapper}>
      {/* SOL: Logo */}
      <div style={styles.left}>
        <IconButton size="small" disableRipple>
          <img
            src={ReactLogo}
            alt="Logo"
            style={{ height: 25, border: '3px solid #fff', borderRadius: 4 }}
          />
        </IconButton>
      </div>

      {/* SAĞ: Bilgi + İkonlar */}
      <div style={styles.right}>
        <div style={{ color: 'white', fontSize: 12 }}>
          B5954 - Kışla Sancaktepe İstanbul
        </div>

        <IconButton size="small" sx={{ color: 'white' }} title="Çıkış Yap">
          <LogoutIcon fontSize="small" />
        </IconButton>

        <IconButton size="small" sx={{ color: 'white' }} title="Küçült">
          <RemoveIcon fontSize="small" />
        </IconButton>

        <IconButton size="small" sx={{ color: 'white' }} title="Kapat">
          <CloseIcon fontSize="small" />
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
    gap: 10,
  },
};
