import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// TODO: Customize panel
// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFC500',
    },
    background: {
      default: '#3c3c3c',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
