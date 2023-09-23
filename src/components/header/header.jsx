import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useSelector } from 'react-redux';

import logo from '../../pictures/logo.png';
import { Button } from '../button';
import { Title } from '../title';
import header from './header.module.scss';

export function Header({ btnText, onClick }) {
  const user = useSelector((state) => state.user);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <img className={header.headerLogo} src={logo} />
          <Title
            variant="h5"
            color="secondary"
            className={header.headerTitle}
            name="Task Manager"
            component="h5"
          />
          {/* <Title
            className={header.headerUser}
            fontFamily="Roboto"
            variant="h6"
            color="secondary"
            name="sdfrgthyjuik"
          /> */}
          {/* {user.isLogged
            ? '<Avatar className={header.headerAvatar}>H</Avatar>'
            : ''} */}
          <Button name={btnText} onClick={onClick} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
