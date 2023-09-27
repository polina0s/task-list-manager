import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import { Button } from '../../components/button';
import { Title } from '../../components/title';
import { useBreakpoints } from '../../utils/useBreakpoints';
import { Menu } from '../menu';
import userHeader from './userHeader.module.scss';

export function UserHeader({ ...props }) {
  const breakpoints = useBreakpoints();

  if (breakpoints.md) {
    return (
      <>
        <IconButton
          color="secondary"
          aria-label="open drawer"
          edge="end"
          onClick={props.handleDrawerOpen}
          sx={{ ...(props.open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          handleDrawerClose={props.handleDrawerClose}
          open={props.open}
          onClick={props.onClick}
          avatar={props.avatar}
          name={props.login}
        />
      </>
    );
  } else {
    return (
      <>
        <Avatar className={userHeader.avatar}>{props.avatar}</Avatar>
        <Title
          className={userHeader.userLogin}
          variant="h5"
          fontFamily="Roboto"
          color="secondary"
          name={props.login}
        />
        <Button name={props.btnText} onClick={props.onClick} />
      </>
    );
  }
}
