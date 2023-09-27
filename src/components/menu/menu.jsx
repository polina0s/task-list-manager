import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GradeIcon from '@mui/icons-material/Grade';
import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';

import { Button } from '../button';
import { Title } from '../title';
import menu from './menu.module.scss';

export function Menu({ open, handleDrawerClose, avatar, name, onClick }) {
  const theme = useTheme();

  return (
    <Drawer
      className={menu.drawer}
      PaperProps={{
        className: menu.paper,
      }}
      variant="temporary"
      anchor="right"
      open={open}
    >
      <div className={menu.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
        <Avatar className={menu.avatar}>{avatar}</Avatar>
        <Title variant="h6" color="secondary" name={name} />
      </div>
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
      <Button className={menu.btn} name="Logout" onClick={onClick} />
    </Drawer>
  );
}
