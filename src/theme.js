 
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['TTForsRegular'] ,
    button: {
      textTransform: 'none',  
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
