import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useRef, useState } from 'react';
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
  deleteTag,
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
  useConfirmModal,
  useTagForm,
  useTaskActions,
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

  const { handleTakeToWork, handleDoneTask } = useTaskActions(dispatch);

  const {
    handleCloseConfirmModal,
    handleOpenTagConfirmModal,
    handleOpenTaskConfirmModal,
    isTagForm,
    isTaskForm,
  } = useConfirmModal();

  useEffect(() => {
    dispatch(getTasks({ limit: 9999 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTags({ limit: 9999 }));
  }, [dispatch]);

  const handleCreateTask = (data) => {
    console.log(data);
    dispatch(createTask(data))
      .unwrap()
      .then(() => {
        navigate('/home');
        handleCloseTaskForm();
      });
  };

  const handleEditTask = (data) => {
    console.log(data);
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
    handleOpenTaskConfirmModal();
  };

  const todoTasks = useMemo(() => filterTasksByStatus(tasks, todo), [tasks]);
  const inProgressTasks = useMemo(
    () => filterTasksByStatus(tasks, inProgress),
    [tasks],
  );
  const doneTasks = useMemo(() => filterTasksByStatus(tasks, done), [tasks]);

  const buttonRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const openTagList = Boolean(anchorEl);

  const handleClick = () => {
    setAnchorEl(buttonRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const handleDeleteTagById = (id) => {
    console.log(id);
    setIdTag(id);
    handleOpenTagConfirmModal();
  };

  const handleDeleteTagFromList = () => {
    dispatch(deleteTag({ id: idTag }))
      .unwrap()
      .then(() => {
        handleCloseConfirmModal();
        setIdTag('');
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
        onButtonAddTag={handleClick}
        buttonRef={buttonRef}
        renderTagForm={({ onCheck, checkedTags }) => (
          <TagList
            open={openTagList}
            anchorEl={anchorEl}
            onClose={handleClose}
            onOpenTagForm={handleOpenCreateTagForm}
            tags={tags}
            handleEditTagById={handleEditTagById}
            onDeleteTagFromList={handleDeleteTagById}
            onCheck={onCheck}
            checkedTags={checkedTags}
          />
        )}
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
      ></TaskForm>

      <TagForm
        onClose={handleCloseTagForm}
        {...(isEditTagForm
          ? {
              onSubmit: handleEditTag,
              open: isEditTagForm,
              text: selectedTag?.name,
              color: selectedTag?.color,
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
        {...(isTaskForm
          ? {
              name: 'task',
              open: isTaskForm,
              onDelete: handleDeleteTask,
            }
          : {
              name: 'tag',
              open: isTagForm,
              onDelete: handleDeleteTagFromList,
            })}
      />
    </>
  );
}
