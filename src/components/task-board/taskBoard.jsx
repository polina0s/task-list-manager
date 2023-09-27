import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { TaskList } from '../task-list';
import board from './taskBoard.module.scss';

export function TaskBoard() {
  return (
    <Box className={board.cont}>
      <Grid container spacing={2}>
        <TaskList name="to do" />
        <TaskList name="take in work" />
        <TaskList name="done" />
      </Grid>
    </Box>
  );
}
