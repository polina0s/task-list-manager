import { useState } from 'react';

export const TASK_FORM = {
  EDIT: 'EDIT',
  CREATE: 'CREATE',
};

export const useTaskForm = () => {
  const [taskForm, setTaskForm] = useState(false);

  const handleCloseTaskForm = () => setTaskForm(false);
  const handleOpenEditTaskForm = () => setTaskForm(TASK_FORM.EDIT);
  const handleOpenCreateTaskForm = () => setTaskForm(TASK_FORM.CREATE);

  const isEditTaskForm = taskForm === TASK_FORM.EDIT;
  const isCreateTaskForm = taskForm === TASK_FORM.CREATE;

  return {
    handleOpenEditTaskForm,
    handleOpenCreateTaskForm,
    handleCloseTaskForm,
    isEditTaskForm,
    isCreateTaskForm,
  };
};
