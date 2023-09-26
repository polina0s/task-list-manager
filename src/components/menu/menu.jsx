import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GradeIcon from '@mui/icons-material/Grade';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';

import { Button } from '../button';
import { Title } from '../title';
import menu from './menu.module.scss';

export function Menu({ ...props }) {
  const drawerWidth = 240;

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));

  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: '#f0e9e5',
        },
      }}
      variant="temporary"
      anchor="right"
      open={props.open}
    >
      <DrawerHeader>
        <IconButton onClick={props.handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
        <Avatar className={menu.avatar}>{props.avatar}</Avatar>
        <Title
          // className={menu.user}
          variant="h8"
          fontFamily="Roboto"
          color="secondary"
          name={props.name}
        />
      </DrawerHeader>
      <Divider />
      <List>
        {['Tasks'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GradeIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider className={menu.divider} />
      <Button className={menu.btn} name="Logout" onClick={props.onClick} />
    </Drawer>
  );
}
