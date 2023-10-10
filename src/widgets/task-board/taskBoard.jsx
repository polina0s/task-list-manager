import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Task } from '../../components/task/task';
import { TaskForm } from '../../components/task-form';
import { TaskList } from '../../components/task-list';
import { createTask } from '../../store/task';
import board from './taskBoard.module.scss';

export function TaskBoard() {
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.task.tasks);
  console.log(tasks);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleSubmit = (data) => {
    dispatch(createTask(data))
      .unwrap()
      .then(() => {
        navigate('/home');
        handleCloseForm();
      });
  };

  const getTasks = (status) => {
    return tasks.map((el) => {
      if (el.status === status) {
        return <Task name={el.text} id={el.id} key={el.id} />;
      }
    });
  };

  return (
    <>
      <Box className={board.cont}>
        <Grid container spacing={2}>
          <TaskList
            onAddClick={handleOpenForm}
            name="to do"
            id="toDo"
            child={getTasks('todo')}
          />
          <TaskList
            onAddClick={handleOpenForm}
            name="in progress"
            id="inProgress"
            child={getTasks('take-to-work')}
          />
          <TaskList onAddClick={handleOpenForm} name="done" id="done" />
        </Grid>
      </Box>
      <TaskForm
        onCloseClick={handleCloseForm}
        open={openForm}
        onSubmit={handleSubmit}
        child={getTasks('done')}
      />
    </>
  );
}
