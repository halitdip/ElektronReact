
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { AlertColor } from '@mui/material';
import { getVersionHook } from '../../hooks/useVersion'
interface UseLoginReturn {
  storeCode: string;
  storePass: string;
  bsUser: string;
  bsPass: string;
  version: string;
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
  const { login, checkLogin } = useContext(AuthContext);
  const [form, setForm] = useState({ storeCode: 'F240', storePass: '206067ri', bsUser: 'halit.dip', bsPass: 'Vuejs123.!' });
  const [openBs, setOpenBs] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor }>({ open: false, message: '', severity: 'error' });
  const [version, setVersion] = useState('');

  useEffect(() => {
    getVersion()
  }, []);

  const getVersion = async () => {
    const versions = await getVersionHook();
    setVersion(versions.version)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const showError = (message: string) => setSnackbar({ open: true, message, severity: 'error' });

  const handleFirst = async () => {
    const model = {
      "userName": form.storeCode,
      "password": form.storePass,
      "loginType": 4,
      "storeCode": form.storeCode
    }
    const check = await checkLogin(model);
    console.log(check)
    if (check?.status) {
      setOpenBs(true);
    } else
      showError(check?.message || 'Lütfen daha sonra tekrar deneyiniz..');
  };

  const handleSecond = async () => {
    const model = {
      "userName": form.bsUser,
      "password": form.bsPass,
      "loginType": 2,
      "storeCode": form.storeCode
    }
    await login(model);
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
    version,
    handleChange,
    handleFirst,
    handleSecond,
    closeSnackbar,
    closeDialog

  };
};

export default useLogin;