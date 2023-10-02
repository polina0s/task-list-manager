import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { TaskList } from '../../components/task-list';
import board from './taskBoard.module.scss';

export function TaskBoard() {
  return (
    <Box className={board.cont}>
      <Grid container spacing={2}>
        <TaskList name="to do" id="toDo" />
        <TaskList name="take in work" id="inWork" />
        <TaskList name="done" id="done" />
      </Grid>
    </Box>
  );
}
