
import React from 'react';
import { Box, Paper, Typography, useTheme, IconButton } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { ColorModeContext } from '../../App';
import LoginForm from './components/LoginForm';
import BSDialog from './components/BSDialog';
import { SnackbarAlert } from '../../components/SnackbarAlert';
import useLogin from './useLogin';
const Logo = require('../../assets/img/a-101-logo.png');
const styles = require('./Login.module.css');

const Login: React.FC = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
 
  const {
    storeCode,
    storePass,
    bsUser,
    bsPass,
    openBs,
    snackbar,
    version,
    handleChange,
    handleFirst,
    handleSecond,
    closeSnackbar,
    closeDialog,
  } = useLogin();

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundColor: theme.customColors.wrapperBg,
        backgroundImage: `linear-gradient(135deg, ${theme.customColors.gradient.join(',')})`,
      }}
    >
      <Paper className={styles.card} elevation={8}>

        <div className={styles.TopinfoCard}>
          <span className={styles.version}>v{version}</span>

          <IconButton
            size="small"
            className={styles.themeToggle}
            onClick={colorMode.toggleColorMode}
          >
            {colorMode.mode === 'dark' ? (
              <Brightness7Icon fontSize="small" />
            ) : (
              <Brightness4Icon fontSize="small" />
            )}
          </IconButton>
        </div>


        <img src={Logo} alt="Logo" className={styles.logo} />
        <Typography variant="h6" className={styles.title}>
          Mağaza Girişi
        </Typography>
        <LoginForm
          storeCode={storeCode}
          storePass={storePass}
          onChange={handleChange}
          onSubmit={handleFirst}
          styles={styles}
        />
      </Paper>

      <BSDialog
        open={openBs}
        bsUser={bsUser}
        bsPass={bsPass}
        onChange={handleChange}
        onClose={closeDialog}
        onSubmit={handleSecond}
        styles={styles}
      />

      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </div>
  );
};

export default Login;
