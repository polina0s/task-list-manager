import { useState } from 'react';

export const TAG_FORM = {
  EDIT: 'EDIT',
  CREATE: 'CREATE',
};

export const useTagForm = () => {
  const [tagForm, setTagForm] = useState(false);

  const handleCloseTagForm = () => setTagForm(false);
  const handleOpenEditTagForm = () => setTagForm(TAG_FORM.EDIT);
  const handleOpenCreateTagForm = () => setTagForm(TAG_FORM.CREATE);

  const isEditTagForm = tagForm === TAG_FORM.EDIT;
  const isCreateTagForm = tagForm === TAG_FORM.CREATE;

  return {
    handleOpenEditTagForm,
    handleOpenCreateTagForm,
    handleCloseTagForm,
    isEditTagForm,
    isCreateTagForm,
  };
};
