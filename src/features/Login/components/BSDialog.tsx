
// src/features/Login/components/BSDialog.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import styles from '../Login.module.css';

interface BSDialogProps {
  open: boolean;
  bsUser: string;
  bsPass: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onSubmit: () => void;
  styles: Record<string, string>;

}

const BSDialog: React.FC<BSDialogProps> = ({ open, bsUser, bsPass, onChange, onClose, onSubmit, styles }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
    <DialogTitle className={styles.dialogTitle}>BS Kullanıcı Giriş</DialogTitle>
    <DialogContent className={styles.dialogContent}>
      <div style={{ marginTop: 5 }}>
        <TextField
          name="bsUser"
          label="Kullanıcı Adı"
          value={bsUser}
          onChange={onChange}
          fullWidth
        />
        <TextField
          name="bsPass"
          type="password"
          label="Şifre"
          value={bsPass}
          onChange={onChange}
          fullWidth
          style={{ marginTop: 16 }}
        />
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>İptal</Button>
      <Button variant="contained" onClick={onSubmit} style={{ color: '#fff' }}>Giriş Yap</Button>
    </DialogActions>
  </Dialog>
);

export default BSDialog;