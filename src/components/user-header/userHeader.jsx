import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import { Button } from '../../components/button';
import { Title } from '../../components/title';
import { useBreakpoints } from '../../utils/useBreakpoints';
import { Menu } from '../menu';
import userHeader from './userHeader.module.scss';

export function UserHeader({
  handleDrawerOpen,
  handleDrawerClose,
  open,
  onClick,
  login,
  avatar,
  btnText,
}) {
  const breakpoints = useBreakpoints();

  if (breakpoints.md) {
    return (
      <>
        {open ? null : (
          <IconButton
            color="secondary"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Menu
          handleDrawerClose={handleDrawerClose}
          open={open}
          onClick={onClick}
          avatar={avatar}
          name={login}
        />
      </>
    );
  }

  return (
    <>
      <Avatar className={userHeader.avatar}>{avatar}</Avatar>
      <Title className={userHeader.userLogin} variant="h6" color="secondary">
        {login}
      </Title>
      <Button onClick={onClick}>{btnText}</Button>
    </>
  );
}
