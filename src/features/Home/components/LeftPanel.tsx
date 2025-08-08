// src/features/Home/components/LeftPanel.tsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

const styles = require('../home.module.css');

interface Props {
  onSendToTerminal: () => void;
  onSendFromTerminal: () => void;
}

export default function LeftPanel({ onSendToTerminal, onSendFromTerminal }: Props) {
  const { loading } = useContext(AuthContext);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);

  const handleConfirmAndSend = async () => {
    handleCloseConfirm();
    onSendToTerminal();
  };

  return (
    <div className={styles.leftPanel}>
      <button
        onClick={handleOpenConfirm}
        className={styles.primaryButton}
        disabled={loading}
        title={loading ? 'İşlem devam ediyor…' : 'Sayım verisini terminale kopyala ve AI akışını başlat'}
      >
        <span style={{ fontWeight: 'bold' }}>⌨</span>
        <span className={styles.buttonText}>Sayım Verisi AI ve Terminale Gönder</span>
      </button>

      <button
        onClick={onSendFromTerminal}
        className={styles.secondaryButton}
        disabled={loading}
        title={loading ? 'İşlem devam ediyor…' : 'Terminalden verileri AI otomasyona gönder'}
      >
        <span style={{ fontWeight: 'bold' }}>🖥</span>
        <span className={styles.buttonText}>Terminalden Verileri AI ye Otomasyona Gönder</span>
      </button>
 
      <Dialog open={openConfirm} onClose={handleCloseConfirm} maxWidth="xs" fullWidth>
        <DialogTitle>İşlem Onayı</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Bu işlem sırasında <b>Tüm  veriler sıfırlanacaktır</b>.
            Devam etmek istediğinize emin misiniz?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseConfirm} variant="outlined">Vazgeç</Button>
          <Button onClick={handleConfirmAndSend} variant="contained" color="error" autoFocus>
            Evet, Devam Et
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
