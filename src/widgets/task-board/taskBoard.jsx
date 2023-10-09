import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState } from 'react';

import { api } from '../../api/api';
import { TaskForm } from '../../components/task-form';
import { TaskList } from '../../components/task-list';
import board from './taskBoard.module.scss';

export function TaskBoard() {
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleAddTask = async ({ text, tags = null }) => {
    const response = await api.addTask({ text: text, tags: tags });
    // handleCloseForm();
    return response;
  };

  return (
    <>
      <Box className={board.cont}>
        <Grid container spacing={2}>
          <TaskList onAddClick={handleOpenForm} name="to do" id="toDo" />
          <TaskList
            onAddClick={handleOpenForm}
            name="in progress"
            id="inProgress"
          />
          <TaskList onAddClick={handleOpenForm} name="done" id="done" />
        </Grid>
      </Box>
      <TaskForm
        onCloseClick={handleCloseForm}
        open={openForm}
        onClick={handleAddTask}
      />
    </>
  );
}
