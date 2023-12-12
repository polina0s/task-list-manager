import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ConfirmModal } from '../../components/confirm-modal';
import { TagForm } from '../../components/tag-form';
import { TagList } from '../../components/tag-list';
import { TaskForm } from '../../components/task-form';
import { allTagsSelector, createTag, getTags } from '../../store/tag';
import {
  allTasksSelector,
  createTask,
  deleteTask,
  editTask,
  getTasks,
  tagsByTaskIdSelector,
} from '../../store/task';
import {
  done,
  filterTagsById,
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tags = useSelector(allTagsSelector);
  const tasks = useSelector(allTasksSelector);
  const selectedTagsByTaskId = useSelector((state) =>
    tagsByTaskIdSelector(state, idTask),
  );

  const { handleOpenCreateTaskForm, handleCloseTaskForm, isCreateTaskForm } =
    useTaskForm();

  const {
    handleOpenEditTagForm,
    handleOpenCreateTagForm,
    handleCloseTagForm,
    isCreateTagForm,
  } = useTagForm();

  const { handleToDo, handleTakeToWork, handleDoneTask } =
    useTaskActions(dispatch);

  const {
    handleCloseConfirmModal,
    handleOpenTagConfirmModal,
    handleOpenTaskConfirmModal,
    isTaskForm,
  } = useConfirmModal();

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

  const handleEditTaskById = (id) => setIdTask(id);

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

  const handleAddTag = (data) => {
    dispatch(createTag({ name: data.text, color: data.color }))
      .unwrap()
      .then(() => {
        handleCloseTagForm();
      });
  };

  const handleDeleteTagFromTask = (task, tagId) => {
    const newTags = filterTagsById(task.tags, tagId).map((tag) => tag.id);
    dispatch(editTask({ id: task.id, text: task.text, tags: newTags }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box className={board.cont}>
        <Grid container spacing={2}>
          <TaskColumn
            status={todo}
            name="to do"
            id="toDo"
            tasks={todoTasks}
            moveToNextStatus={handleTakeToWork}
            openCreateTaskForm={handleOpenCreateTaskForm}
            deleteTaskById={handleDeleteTaskById}
            editTaskById={handleEditTaskById}
            onDeleteTag={handleDeleteTagFromTask}
            onChangeStatus={handleToDo}
          />
          <TaskColumn
            status={inProgress}
            name="in progress"
            id="inProgress"
            tasks={inProgressTasks}
            returnToPrevStatus={handleToDo}
            moveToNextStatus={handleDoneTask}
            deleteTaskById={handleDeleteTaskById}
            editTaskById={handleEditTaskById}
            onDeleteTag={handleDeleteTagFromTask}
            onChangeStatus={handleTakeToWork}
          />
          <TaskColumn
            status={done}
            name="done"
            id="done"
            tasks={doneTasks}
            returnToPrevStatus={handleTakeToWork}
            deleteTaskById={handleDeleteTaskById}
            editTaskById={handleEditTaskById}
            onDeleteTag={handleDeleteTagFromTask}
            onChangeStatus={handleDoneTask}
          />
        </Grid>
      </Box>

      <TaskForm
        onClose={handleCloseTaskForm}
        tags={selectedTagsByTaskId}
        openTaskForm={isCreateTaskForm}
        onSubmit={handleCreateTask}
        title="Create task"
        btnText="Add task"
        renderTagForm={({ onCheck, checkedTags, open, anchorEl, onClose }) => (
          <TagList
            onCheck={onCheck}
            checkedTags={checkedTags}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            onOpenTagForm={handleOpenCreateTagForm}
            tags={tags}
            handleEditTagById={handleOpenEditTagForm}
            onDeleteTagFromList={handleOpenTagConfirmModal}
          />
        )}
      />

      <TagForm
        onClose={handleCloseTagForm}
        onSubmit={handleAddTag}
        open={isCreateTagForm}
        title="Create tag"
        btnText="Create tag"
      />

      <ConfirmModal
        onClose={handleCloseConfirmModal}
        open={isTaskForm}
        onDelete={handleDeleteTask}
      >
        Are you sure you want to delete this task?
      </ConfirmModal>
    </DndProvider>
  );
}
