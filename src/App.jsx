import './styles/main.scss';

import { ThemeProvider } from '@mui/material/styles';

import { Registration } from './pages/registration';
import { theme } from './styles/theme';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Registration />
    </ThemeProvider>
  );
}
