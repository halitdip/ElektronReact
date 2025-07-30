
import React from 'react';
import { Box, TextField, Button } from '@mui/material';

interface LoginFormProps {
  storeCode: string;
  storePass: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  styles: Record<string, string>;
}

const LoginForm: React.FC<LoginFormProps> = ({ storeCode, storePass, onChange, onSubmit, styles }) => (
  <Box component="form" className={styles.form} noValidate>
    <TextField
      name="storeCode"
      label="Mağaza Kodu"
      value={storeCode}
      onChange={onChange}
      fullWidth
    />
    <TextField
      name="storePass"
      type="password"
      label="Şifre"
      value={storePass}
      onChange={onChange}
      fullWidth
    />
    <Button
      variant="contained"
      onClick={onSubmit}
      fullWidth
      style={{ color: '#fff' }}
    >
      Devam Et
    </Button>
  </Box>
);

export default LoginForm;