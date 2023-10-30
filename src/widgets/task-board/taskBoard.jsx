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
import {
  allTasksSelector,
  createTask,
  deleteTask,
  editTask,
  editTaskStatus,
  getTasks,
  taskByIdSelector,
} from '../../store/task';
import { useTaskForm } from '../../utils';
import { done, inProgress, todo } from '../../utils';
import { filterTasksByStatus } from '../../utils';
import board from './taskBoard.module.scss';

export function TaskBoard() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [idTask, setIdTask] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector(allTasksSelector);
  const selectedTask = useSelector((state) => taskByIdSelector(state, idTask));

  const {
    handleOpenEditForm,
    handleOpenCreateForm,
    handleCloseForm,
    isEditForm,
    isCreateForm,
  } = useTaskForm();

  useEffect(() => {
    dispatch(getTasks({ limit: 999 }));
  }, [dispatch]);

  const handleOpenConfirmModal = () => setOpenConfirmModal(true);
  const handleCloseConfirmModal = () => setOpenConfirmModal(false);

  const handleCreate = (data) => {
    dispatch(createTask(data))
      .unwrap()
      .then(() => {
        navigate('/home');
        handleCloseForm();
      });
  };

  const handleEdit = (data) => {
    dispatch(editTask({ id: idTask, text: data.text }))
      .unwrap()
      .then(() => {
        handleCloseForm();
      });
  };
  const handleEditTaskById = (id) => {
    setIdTask(id);
    handleOpenEditForm();
  };

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

  const handleTakeToWork = (id) => {
    dispatch(editTaskStatus({ id: id, status: inProgress }));
  };

  const handleDoneTask = (id) => {
    dispatch(editTaskStatus({ id: id, status: done }));
  };

  const todoTasks = useMemo(() => filterTasksByStatus(tasks, todo), [tasks]);
  const inProgressTasks = useMemo(
    () => filterTasksByStatus(tasks, inProgress),
    [tasks],
  );
  const doneTasks = useMemo(() => filterTasksByStatus(tasks, done), [tasks]);

  const handleOpenMenu = () => {};

  return (
    <>
      <Box className={board.cont}>
        <Grid container spacing={2}>
          <TaskList
            onAdd={handleOpenCreateForm}
            onMore={handleOpenMenu}
            name="to do"
            id="toDo"
          >
            {todoTasks.map((el) => (
              <Task
                name={el.text}
                id={el.id}
                key={el.id}
                onDelete={() => handleDeleteTaskById(el.id)}
                onEdit={() => handleEditTaskById(el.id, el.text)}
                onChangeStatus={() => handleTakeToWork(el.id)}
              />
            ))}
          </TaskList>
          <TaskList onMore={handleOpenMenu} name="in progress" id="inProgress">
            {inProgressTasks.map((el) => (
              <Task
                name={el.text}
                id={el.id}
                key={el.id}
                onDelete={() => handleDeleteTaskById(el.id)}
                onEdit={() => handleEditTaskById(el.id, el.text)}
                onChangeStatus={() => handleDoneTask(el.id)}
              />
            ))}
          </TaskList>
          <TaskList onMore={handleOpenMenu} name="done" id="done">
            {doneTasks.map((el) => (
              <Task
                name={el.text}
                id={el.id}
                key={el.id}
                onDelete={() => handleDeleteTaskById(el.id)}
                onEdit={() => handleEditTaskById(el.id, el.text)}
              />
            ))}
          </TaskList>
        </Grid>
      </Box>
      <TaskForm
        onClose={handleCloseForm}
        open={isCreateForm}
        onSubmit={handleCreate}
        title="Create task"
        btnText="Add task"
      />
      <TaskForm
        onClose={handleCloseForm}
        open={isEditForm}
        // open="true"
        onSubmit={handleEdit}
        text={selectedTask?.text}
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
