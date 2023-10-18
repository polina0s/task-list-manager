import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ConfirmModal } from '../../components/confirm-modal';
import { Task } from '../../components/task/task';
import { TaskForm } from '../../components/task-form';
import { TaskList } from '../../components/task-list';
import { createTask, deleteTask, getTasks } from '../../store/task';
import { done, inProgress, todo } from '../../utils';
import { filterTasksByStatus } from '../../utils';
import board from './taskBoard.module.scss';

export function TaskBoard() {
  const [openCreate, setCreate] = useState(false);
  const [openEdit, setEdit] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [idTask, setIdTask] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.task.tasks);

  useEffect(() => {
    dispatch(getTasks({ limit: 999 }));
  }, [dispatch]);

  const handleOpenCreate = () => {
    setCreate(true);
  };
  const handleCloseCreate = () => {
    setCreate(false);
  };

  const handleOpenEdit = () => {
    setEdit(true);
  };
  const handleCloseEdit = () => {
    setEdit(false);
  };

  const handleOpenConfirmModal = () => {
    setOpenConfirmModal(true);
  };
  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  };

  const handleSubmit = (data) => {
    dispatch(createTask(data))
      .unwrap()
      .then(() => {
        navigate('/home');
        handleCloseCreate();
      });
  };

  const todoTasks = useMemo(() => filterTasksByStatus(tasks, todo), [tasks]);
  const inProgressTasks = useMemo(
    () => filterTasksByStatus(tasks, inProgress),
    [tasks],
  );
  const doneTasks = useMemo(() => filterTasksByStatus(tasks, done), [tasks]);

  const handleDeleteTask = () => {
    dispatch(deleteTask({ id: idTask }))
      .unwrap()
      .then(() => {
        handleCloseConfirmModal();
        setIdTask('');
      });
  };
  const handleDeleteTaskById = (id) => {
    setIdTask(id);
    handleOpenConfirmModal();
  };

  const handleOpenMenu = () => {};

  return (
    <>
      <Box className={board.cont}>
        <Grid container spacing={2}>
          <TaskList
            onAdd={handleOpenCreate}
            onMore={handleOpenMenu}
            name="to do"
            id="toDo"
          >
            {todoTasks.map((el) => (
              <Task
                name={el.text}
                id={el.id}
                key={el.id}
                onDelete={() => {
                  handleDeleteTaskById(el.id);
                }}
                onEdit={handleOpenEdit}
              />
            ))}
          </TaskList>
          <TaskList onMore={handleOpenMenu} name="in progress" id="inProgress">
            {inProgressTasks.map((el) => (
              <Task
                name={el.text}
                id={el.id}
                key={el.id}
                onDelete={() => {
                  handleDeleteTaskById(el.id);
                }}
                onEdit={handleOpenEdit}
              />
            ))}
          </TaskList>
          <TaskList onMore={handleOpenMenu} name="done" id="done">
            {doneTasks.map((el) => (
              <Task
                name={el.text}
                id={el.id}
                key={el.id}
                onDelete={() => {
                  handleDeleteTaskById(el.id);
                }}
                onEdit={handleOpenEdit}
              />
            ))}
          </TaskList>
        </Grid>
      </Box>
      <TaskForm
        onClose={handleCloseCreate}
        open={openCreate}
        onSubmit={handleSubmit}
        title="Create task"
        btnText="Add task"
      />
      <TaskForm
        onClose={handleCloseEdit}
        open={openEdit}
        onSubmit={handleSubmit}
        title="Edit task"
        btnText="Save"
      />
      <ConfirmModal
        onClose={handleCloseConfirmModal}
        onDelete={handleDeleteTask}
        open={openConfirmModal}
      />
    </>
  );
}
