import { useState } from 'react';

export const TASK_FORM = {
  EDIT: 'EDIT',
  CREATE: 'CREATE',
};

export const useTaskForm = () => {
  const [taskForm, setTaskForm] = useState(false);

  const handleCloseForm = () => setTaskForm(false);
  const handleOpenEditForm = () => setTaskForm(TASK_FORM.EDIT);
  const handleOpenCreateForm = () => setTaskForm(TASK_FORM.CREATE);

  const isEditForm = taskForm === TASK_FORM.EDIT;
  const isCreateForm = taskForm === TASK_FORM.CREATE;

  return {
    handleOpenEditForm,
    handleOpenCreateForm,
    handleCloseForm,
    isEditForm,
    isCreateForm,
  };
};
