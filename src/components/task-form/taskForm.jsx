// import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { Button } from '../button/button';
import { Input } from '../input/input';
import { Title } from '../title';
// import * as React from 'react';
import form from './taskForm.module.scss';

export function TaskForm({ onCloseClick, open }) {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal open={open} onClose={onCloseClick}>
        <Box className={form.cont}>
          <div className={form.titleCont}>
            <Title color="secondary" variant="h6" name="Create task" />
            <IconButton onClick={onCloseClick}>
              <CloseIcon color="secondary" />
            </IconButton>
          </div>
          <Input className={form.input} label="task text" />
          <Button name="Add task" />
        </Box>
      </Modal>
    </div>
  );
}
