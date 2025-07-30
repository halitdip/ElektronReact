
import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface SnackbarAlertProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: () => void;
}

export const SnackbarAlert: React.FC<SnackbarAlertProps> = ({ open, message, severity, onClose }) => (
  <Snackbar open={open} autoHideDuration={3000} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
    <Alert onClose={onClose} severity={severity} variant="filled">
      {message}
    </Alert>
  </Snackbar>
);
