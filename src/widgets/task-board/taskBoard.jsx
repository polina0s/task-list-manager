import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ConfirmModal } from '../../components/confirm-modal';
import { TagForm } from '../../components/tag-form';
import { Task } from '../../components/task/task';
import { TaskForm } from '../../components/task-form';
import { TaskList } from '../../components/task-list';
import { allTagsSelector, createTag, getTags } from '../../store/tag';
import {
  allTasksSelector,
  createTask,
  deleteTask,
  editTask,
  editTaskStatus,
  getTasks,
  taskByIdSelector,
} from '../../store/task';
import {
  done,
  filterTasksByStatus,
  inProgress,
  todo,
  useTagForm,
  useTaskForm,
} from '../../utils';
import board from './taskBoard.module.scss';

export function TaskBoard() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [idTask, setIdTask] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tags = useSelector(allTagsSelector);
  const tasks = useSelector(allTasksSelector);
  const selectedTask = useSelector((state) => taskByIdSelector(state, idTask));

  const {
    handleOpenEditForm,
    handleOpenCreateForm,
    handleCloseForm,
    isEditForm,
    isCreateForm,
  } = useTaskForm();

  const {
    // handleOpenEditTagForm,
    handleOpenCreateTagForm,
    handleCloseTagForm,
    // isEditTagForm,
    isCreateTagForm,
  } = useTagForm();

  useEffect(() => {
    dispatch(getTasks({ limit: 9999 }));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getTags({ limit: 9999 }));
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

  const [anchorEl, setAnchorEl] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openTag = Boolean(anchorEl);

  const handleAddTag = (data) => {
    dispatch(createTag({ name: data.text, color: data.color }))
      .unwrap()
      .then(() => {
        handleCloseTagForm();
      });
  };

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
        openTaskForm={isCreateForm}
        onSubmit={handleCreate}
        title="Create task"
        btnText="Add task"
        onTag={handleClick}
        anchorEl={anchorEl}
        onCloseTag={handleClose}
        openTag={openTag}
        tags={tags}
        onChangeTag={handleAddTag}
        onOpenTagForm={handleOpenCreateTagForm}
      />
      <TaskForm
        onClose={handleCloseForm}
        openTaskForm={isEditForm}
        onSubmit={handleEdit}
        text={selectedTask?.text}
        title="Edit task"
        btnText="Save"
        onTag={handleClick}
        anchorEl={anchorEl}
        onCloseTag={handleClose}
        openTag={openTag}
        tags={tags}
        onChangeTag={handleAddTag}
        onOpenTagForm={handleOpenCreateTagForm}
      />
      <ConfirmModal
        onClose={handleCloseConfirmModal}
        onDelete={handleDeleteTask}
        open={openConfirmModal}
      />
      <TagForm
        onClose={handleCloseTagForm}
        onSubmit={handleAddTag}
        open={isCreateTagForm}
        title="Create tag"
        btnText="Create tag"
      />
    </>
  );
}
