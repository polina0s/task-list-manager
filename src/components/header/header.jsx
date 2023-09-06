import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

import { Title } from '../title';
import header from './header.module.scss';

export function Header() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <img className={header.headerLogo} src="/src/pictures/logo.png" />
          <Title
            size="h5"
            color="secondary"
            className={header.headerTitle}
            name="Task Manager"
          />
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
