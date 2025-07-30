import React, { useState, useContext } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [storeCode, setStoreCode] = useState('');
  const [storePass, setStorePass] = useState('');
  const [bsUser, setBsUser] = useState('');
  const [bsPass, setBsPass] = useState('');
  const [openBs, setOpenBs] = useState(false);

  const handleFirst = () => {
    if (storeCode === 'admin' && storePass === 'admin') {
      setOpenBs(true);
    } else {
      alert('Mağaza kodu veya şifre hatalı');
    }
  };

  const handleSecond = () => {
    if (bsUser === 'admin' && bsPass === 'admin') {
      login();
      navigate('/');
    } else {
      alert('Kullanıcı adı veya şifre hatalı');
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 250 }}>
        <TextField label="Mağaza Kodu" value={storeCode} onChange={e => setStoreCode(e.target.value)} fullWidth />
        <TextField label="Şifre" type="password" value={storePass} onChange={e => setStorePass(e.target.value)} fullWidth />
        <Button variant="contained" onClick={handleFirst}>Giriş</Button>
      </Box>
      <Dialog open={openBs} onClose={() => setOpenBs(false)}>
        <DialogTitle>BS Girişi</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Kullanıcı Adı" value={bsUser} onChange={e => setBsUser(e.target.value)} fullWidth />
          <TextField label="Şifre" type="password" value={bsPass} onChange={e => setBsPass(e.target.value)} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBs(false)}>İptal</Button>
          <Button variant="contained" onClick={handleSecond}>Giriş</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
