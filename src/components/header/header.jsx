import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import header from './header.module.scss';
// sx={{ bgcolor: 'background.beige' }}
export function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img className={header.headerLogo} src="/src/pictures/logo.png" />
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, fontFamily: 'Cookie', color: '#4c031f' }}
          >
            Task Manager
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
