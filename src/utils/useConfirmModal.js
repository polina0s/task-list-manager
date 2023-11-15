import { useState } from 'react';

const FORM = {
  TAG: 'TAG',
  TASK: 'TASK',
};

// export const useTaskForm = () => {
//   const [taskForm, setTaskForm] = useState(false);

//   const handleCloseTaskForm = () => setTaskForm(false);
//   const handleOpenEditTaskForm = () => setTaskForm(TASK_FORM.EDIT);
//   const handleOpenCreateTaskForm = () => setTaskForm(TASK_FORM.CREATE);

//   const isEditTaskForm = taskForm === TASK_FORM.EDIT;
//   const isCreateTaskForm = taskForm === TASK_FORM.CREATE;

//   return {
//     handleOpenEditTaskForm,
//     handleOpenCreateTaskForm,
//     handleCloseTaskForm,
//     isEditTaskForm,
//     isCreateTaskForm,
//   };
// };

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

// export const useConfirmModal = () => {
//   const [openConfirmModal, setOpenConfirmModal] = useState(false);

//   const handleOpenConfirmModal = () => setOpenConfirmModal(true);
//   const handleCloseConfirmModal = () => setOpenConfirmModal(false);

//   return { openConfirmModal, handleOpenConfirmModal, handleCloseConfirmModal };
// };
