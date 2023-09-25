import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useSelector } from 'react-redux';

import { Button } from '../../components/button';
import { Title } from '../../components/title';
import logo from '../../pictures/logo.png';
import header from './header.module.scss';

export function Header({ btnText, onClick }) {
  const user = useSelector((state) => state.user);
  const avatar = user.login?.[0];

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
          {user.isLogged ? (
            <>
              <Title
                className={header.headerUser}
                variant="h6"
                color="secondary"
                name={user.login}
              />
              <Avatar className={header.headerAvatar}>{avatar}</Avatar>
            </>
          ) : null}
          <Button name={btnText} onClick={onClick} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
