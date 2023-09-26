import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '../../components/button';
import { Menu } from '../../components/menu/menu';
import { Title } from '../../components/title';
import logo from '../../pictures/logo.png';
import { useBreakpoints } from '../../utils/breakpoints';
import header from './header.module.scss';

export function Header({ btnText, onClick }) {
  const user = useSelector((state) => state.user);
  const avatar = user.login?.[0];
  const [open, setOpen] = useState(false);
  const breakpoints = useBreakpoints();

  const Aaa = () => {
    if (breakpoints.sm) {
      return (
        <>
          <IconButton
            color="secondary"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            handleDrawerClose={handleDrawerClose}
            open={open}
            onClick={onClick}
            avatar={avatar}
            name={user.login}
          />
        </>
      );
    } else {
      return (
        <>
          <Avatar className={header.avatar}>{avatar}</Avatar>
          <Title
            className={header.userLogin}
            variant="h5"
            fontFamily="Roboto"
            color="secondary"
            name={user.login}
          />
          <Button name={btnText} onClick={onClick} />
        </>
      );
    }
  };

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
          {/* <Button name={btnText} onClick={onClick} /> */}
          {user.isLogged ? <Aaa /> : null}
        </Toolbar>
      </AppBar>
      <Main open={open}></Main>
    </Box>
  );
}
