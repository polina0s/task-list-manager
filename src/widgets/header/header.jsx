import { AppBar, Box, Toolbar } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '../../components/button';
import { Title } from '../../components/title';
import { UserHeader } from '../../components/user-header/userHeader';
import logo from '../../pictures/logo.png';
import header from './header.module.scss';

export function Header({ btnText, onClick }) {
  const user = useSelector((state) => state.user);
  const avatar = user.login?.[0];
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <img className={header.logo} src={logo} />
          <Title
            variant="h4"
            color="secondary"
            className={header.title}
            name="Task Manager"
          />
          {user.isLogged ? (
            <UserHeader
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
              open={open}
              onClick={onClick}
              avatar={avatar}
              login={user.login}
              btnText={btnText}
            />
          ) : (
            <Button name={btnText} onClick={onClick} />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
