import { useState } from 'react';

export const useConfirmModal = () => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleOpenConfirmModal = () => setOpenConfirmModal(true);
  const handleCloseConfirmModal = () => setOpenConfirmModal(false);

  return { openConfirmModal, handleOpenConfirmModal, handleCloseConfirmModal };
};
