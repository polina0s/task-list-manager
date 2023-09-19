import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import logo from '../../pictures/logo.png';
import { Button } from '../button';
import { Title } from '../title';
import header from './header.module.scss';

export function Header({ btnText, onClick }) {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <img className={header.headerLogo} src={logo} />
          <Title
            size="h5"
            color="secondary"
            className={header.headerTitle}
            name="Task Manager"
            component="div"
          />
          <Button name={btnText} onClick={onClick} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
