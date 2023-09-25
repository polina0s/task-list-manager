import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '../../components/button';
// import Avatar from '@mui/material/Avatar';
import { Menu } from '../../components/drawer/drawer';
import { Title } from '../../components/title';
import logo from '../../pictures/logo.png';
import header from './header.module.scss';

export function Header({ btnText, onClick }) {
  const user = useSelector((state) => state.user);
  // const avatar = user.login?.[0];
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
          <img className={header.headerLogo} src={logo} />
          <Title
            variant="h5"
            color="secondary"
            className={header.headerTitle}
            name="Task Manager"
            component="h5"
          />
          <Button name={btnText} onClick={onClick} />
          {user.isLogged ? (
            <>
              {/* <Title
                className={header.headerUser}
                variant="h5"
                fontFamily="Roboto"
                color="secondary"
                name={user.login}
              />
              <Avatar className={header.headerAvatar}>{avatar}</Avatar> */}
              <IconButton
                color="secondary"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                sx={{ ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Menu handleDrawerClose={handleDrawerClose} open={open} />
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      <Main open={open}></Main>
    </Box>
  );
}
