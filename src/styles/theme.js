import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#f0e9e5',
    },
    secondary: {
      main: '#573e32',
    },
  },

  typography: {
    fontFamily: 'Roboto',
    h5: {
      fontSize: '1.5rem',
      fontFamily: 'Pacifico',
    },
    h4: {
      fontSize: '1rem',
      fontFamily: 'Pacifico',
    },
  },
});
