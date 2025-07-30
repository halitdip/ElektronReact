
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { AlertColor } from '@mui/material';

interface UseLoginReturn {
  storeCode: string;
  storePass: string;
  bsUser: string;
  bsPass: string;
  openBs: boolean;
  snackbar: { open: boolean; message: string; severity: AlertColor };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFirst: () => void;
  handleSecond: () => void;
  closeSnackbar: () => void;
  closeDialog: () => void;
}

const useLogin = (): UseLoginReturn => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ storeCode: 'admin', storePass: 'admin', bsUser: 'admin', bsPass: 'admin' });
  const [openBs, setOpenBs] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor }>({ open: false, message: '', severity: 'error' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const showError = (message: string) => setSnackbar({ open: true, message, severity: 'error' });

  const handleFirst = () => {
    if (form.storeCode === 'admin' && form.storePass === 'admin') setOpenBs(true);
    else showError('Mağaza kodu veya şifre yanlış!');
  };

  const handleSecond = () => {
    if (form.bsUser === 'admin' && form.bsPass === 'admin') {
      login();
      navigate('/');
    } else showError('BS kullanıcı adı veya şifre yanlış!');
  };

  const closeSnackbar = () => setSnackbar(s => ({ ...s, open: false }));
  const closeDialog = () => setOpenBs(false);

  return {
    storeCode: form.storeCode,
    storePass: form.storePass,
    bsUser: form.bsUser,
    bsPass: form.bsPass,
    openBs,
    snackbar,
    handleChange,
    handleFirst,
    handleSecond,
    closeSnackbar,
    closeDialog,
  };
};

export default useLogin;