import React, { useState, useContext } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  minWidth: 250
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [step, setStep] = useState(1);
  const [storeCode, setStoreCode] = useState('');
  const [storePass, setStorePass] = useState('');
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');

  const handleFirst = () => {
    if (storeCode === 'admin' && storePass === 'admin') {
      setStep(2);
    } else {
      alert('Mağaza bilgileri hatalı');
    }
  };

  const handleSecond = () => {
    if (userName === 'admin' && userPass === 'admin') {
      login();
      navigate('/');
    } else {
      alert('Kullanıcı bilgileri hatalı');
    }
  };

  return (
    <>
      <Modal open={step === 1} hideBackdrop>
        <Box sx={modalStyle}>
          <TextField label="Mağaza Kodu" value={storeCode} onChange={e => setStoreCode(e.target.value)} fullWidth />
          <TextField label="Şifre" type="password" value={storePass} onChange={e => setStorePass(e.target.value)} fullWidth />
          <Button variant="contained" onClick={handleFirst}>Giriş Yap</Button>
        </Box>
      </Modal>
      <Modal open={step === 2} hideBackdrop>
        <Box sx={modalStyle}>
          <TextField label="Kullanıcı Adı" value={userName} onChange={e => setUserName(e.target.value)} fullWidth />
          <TextField label="Şifre" type="password" value={userPass} onChange={e => setUserPass(e.target.value)} fullWidth />
          <Button variant="contained" onClick={handleSecond}>Onayla</Button>
        </Box>
      </Modal>
    </>
  );
}
