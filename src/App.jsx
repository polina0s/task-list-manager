import './styles/main.scss';

import { ThemeProvider } from '@mui/material/styles';

import { Registration } from './pages/registration';
import { orange } from './styles/theme';

export function App() {
  return (
    <ThemeProvider theme={orange}>
      <Registration />
    </ThemeProvider>
  );
}
