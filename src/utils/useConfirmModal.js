import { useState } from 'react';

const FORM = {
  TAG: 'TAG',
  TASK: 'TASK',
};

export const useConfirmModal = () => {
  const [form, setForm] = useState(false);

  const handleCloseConfirmModal = () => setForm(false);
  const handleOpenTagConfirmModal = () => setForm(FORM.TAG);
  const handleOpenTaskConfirmModal = () => setForm(FORM.TASK);

  const isTagForm = form === FORM.TAG;
  const isTaskForm = form === FORM.TASK;

  return {
    handleCloseConfirmModal,
    handleOpenTagConfirmModal,
    handleOpenTaskConfirmModal,
    isTagForm,
    isTaskForm,
  };
};
