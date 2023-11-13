import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ConfirmModal } from '../../components/confirm-modal';
import { TagForm } from '../../components/tag-form';
import { TagList } from '../../components/tag-list/tagList';
import { TaskForm } from '../../components/task-form';
import {
  allTagsSelector,
  createTag,
  editTag,
  getTags,
  tagByIdSelector,
} from '../../store/tag';
import {
  allTasksSelector,
  createTask,
  deleteTask,
  editTask,
  getTasks,
  taskByIdSelector,
} from '../../store/task';
import {
  done,
  filterTasksByStatus,
  inProgress,
  todo,
  useActions,
  useConfirmModal,
  useTagForm,
  useTaskForm,
} from '../../utils';
import { TaskColumn } from './components/task-column';
import board from './taskBoard.module.scss';

export function TaskBoard() {
  const [idTask, setIdTask] = useState('');
  const [idTag, setIdTag] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tags = useSelector(allTagsSelector);
  const tasks = useSelector(allTasksSelector);
  const selectedTask = useSelector((state) => taskByIdSelector(state, idTask));
  const selectedTag = useSelector((state) => tagByIdSelector(state, idTag));

  const {
    handleOpenEditTaskForm,
    handleOpenCreateTaskForm,
    handleCloseTaskForm,
    isEditTaskForm,
    isCreateTaskForm,
  } = useTaskForm();

  const {
    handleOpenEditTagForm,
    handleOpenCreateTagForm,
    handleCloseTagForm,
    isEditTagForm,
    isCreateTagForm,
  } = useTagForm();

  const { handleTakeToWork, handleDoneTask } = useActions(dispatch);

  const { openConfirmModal, handleOpenConfirmModal, handleCloseConfirmModal } =
    useConfirmModal();

  useEffect(() => {
    dispatch(getTasks({ limit: 9999 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTags({ limit: 9999 }));
  }, [dispatch]);

  const handleCreateTask = (data) => {
    dispatch(createTask(data))
      .unwrap()
      .then(() => {
        navigate('/home');
        handleCloseTaskForm();
      });
  };

  const handleEditTask = (data) => {
    dispatch(editTask({ id: idTask, text: data.text }))
      .unwrap()
      .then(() => {
        handleCloseTaskForm();
      });
  };
  const handleEditTaskById = (id) => {
    setIdTask(id);
    handleOpenEditTaskForm();
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

  const todoTasks = useMemo(() => filterTasksByStatus(tasks, todo), [tasks]);
  const inProgressTasks = useMemo(
    () => filterTasksByStatus(tasks, inProgress),
    [tasks],
  );
  const doneTasks = useMemo(() => filterTasksByStatus(tasks, done), [tasks]);

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

  const handleEditTagById = (id) => {
    setIdTag(id);
    handleOpenEditTagForm();
  };

  const handleEditTag = (data) => {
    dispatch(editTag({ id: idTag, name: data.text, color: data.color }))
      .unwrap()
      .then(() => {
        handleCloseTagForm();
      });
  };

  const handleOpenMenu = () => {};

  return (
    <>
      <Box className={board.cont}>
        <Grid container spacing={2}>
          <TaskColumn
            name="to do"
            id="toDo"
            tasks={todoTasks}
            onChangeStatus={handleTakeToWork}
            openCreateTaskForm={handleOpenCreateTaskForm}
            openMenu={handleOpenMenu}
            deleteTaskById={handleDeleteTaskById}
            editTaskById={handleEditTaskById}
          />
          <TaskColumn
            name="in progress"
            id="inProgress"
            tasks={inProgressTasks}
            onChangeStatus={handleDoneTask}
            openMenu={handleOpenMenu}
            deleteTaskById={handleDeleteTaskById}
            editTaskById={handleEditTaskById}
          />
          <TaskColumn
            name="done"
            id="done"
            tasks={doneTasks}
            openMenu={handleOpenMenu}
            deleteTaskById={handleDeleteTaskById}
            editTaskById={handleEditTaskById}
          />
        </Grid>
      </Box>

      <TaskForm
        onClose={handleCloseTaskForm}
        onTag={handleClick}
        {...(isEditTaskForm
          ? {
              openTaskForm: isEditTaskForm,
              onSubmit: handleEditTask,
              text: selectedTask?.text,
              title: 'Edit task',
              btnText: 'Save',
            }
          : {
              openTaskForm: isCreateTaskForm,
              onSubmit: handleCreateTask,
              title: 'Create task',
              btnText: 'Add task',
            })}
      >
        <TagList
          open={openTag}
          anchorEl={anchorEl}
          onClose={handleClose}
          onChange={handleAddTag}
          onOpenTagForm={handleOpenCreateTagForm}
          tags={tags}
          handleEditTagById={handleEditTagById}
          // onCheck={}
        ></TagList>
      </TaskForm>

      <TagForm
        onClose={handleCloseTagForm}
        {...(isEditTagForm
          ? {
              onSubmit: handleEditTag,
              open: isEditTagForm,
              text: selectedTag?.name,
              title: 'Edit tag',
              btnText: 'Edit tag',
            }
          : {
              onSubmit: handleAddTag,
              open: isCreateTagForm,
              title: 'Create tag',
              btnText: 'Create tag',
            })}
      />

      <ConfirmModal
        onClose={handleCloseConfirmModal}
        onDelete={handleDeleteTask}
        open={openConfirmModal}
      />
    </>
  );
}
