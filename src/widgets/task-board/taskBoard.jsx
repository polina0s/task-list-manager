import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState } from 'react';

import { TaskForm } from '../../components/task-form';
import { TaskList } from '../../components/task-list';
import board from './taskBoard.module.scss';

export function TaskBoard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className={board.cont}>
        <Grid container spacing={2}>
          <TaskList onAddClick={handleOpen} name="to do" id="toDo" />
          <TaskList
            onAddClick={handleOpen}
            name="in progress"
            id="inProgress"
          />
          <TaskList onAddClick={handleOpen} name="done" id="done" />
        </Grid>
      </Box>
      <TaskForm onCloseClick={handleClose} open={open} />
    </>
  );
}
