import { AppBar, Box, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useSelector } from 'react-redux';

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

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: '-240px',
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      }),
    }),
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <img className={header.logo} src={logo} />
          <Title
            variant="h5"
            color="secondary"
            className={header.title}
            name="Task Manager"
            component="h5"
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
          ) : null}
        </Toolbar>
      </AppBar>
      <Main open={open}></Main>
    </Box>
  );
}
