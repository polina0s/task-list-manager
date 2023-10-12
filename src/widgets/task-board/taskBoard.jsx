import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Task } from '../../components/task/task';
import { TaskForm } from '../../components/task-form';
import { TaskList } from '../../components/task-list';
import { createTask } from '../../store/task';
import { filterTasks } from '../../utils';
import board from './taskBoard.module.scss';

export function TaskBoard() {
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.task.tasks);

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

  const todoTasks = useMemo(() => filterTasks(tasks, 'todo'), [tasks]);
  const inProgressTasks = useMemo(
    () => filterTasks(tasks, 'take-to-work'),
    [tasks],
  );
  const doneTasks = useMemo(() => filterTasks(tasks, 'done'), [tasks]);

  return (
    <>
      <Box className={board.cont}>
        <Grid container spacing={2}>
          <TaskList onAddClick={handleOpenForm} name="to do" id="toDo">
            {todoTasks.map((el) => (
              <Task name={el.text} id={el.id} key={el.id} />
            ))}
          </TaskList>
          <TaskList
            onAddClick={handleOpenForm}
            name="in progress"
            id="inProgress"
          >
            {inProgressTasks.map((el) => (
              <Task name={el.text} id={el.id} key={el.id} />
            ))}
          </TaskList>
          <TaskList onAddClick={handleOpenForm} name="done" id="done">
            {doneTasks.map((el) => (
              <Task name={el.text} id={el.id} key={el.id} />
            ))}
          </TaskList>
        </Grid>
      </Box>
      <TaskForm
        onCloseClick={handleCloseForm}
        open={openForm}
        onSubmit={handleSubmit}
      />
    </>
  );
}
