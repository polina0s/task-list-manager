import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { Button } from '../button/button';
import { Title } from '../title';
import modal from './confirmModal.module.scss';

export function ConfirmModal({
  onCloseClick,
  onDeleteClick,
  onCancelClick,
  open,
  id,
}) {
  return (
    <Modal open={open} onClose={onCloseClick} id={id}>
      <Box className={modal.cont}>
        <div className={modal.titleCont}>
          <Title
            color="secondary"
            variant="h6"
            name="Are you sure you want to delete the task?"
          />
          <IconButton onClick={onCloseClick}>
            <CloseIcon color="secondary" />
          </IconButton>
        </div>
        <Button name="DELETE" onClick={onDeleteClick} />
        <Button name="CANCEL" onClick={onCancelClick} />
      </Box>
    </Modal>
  );
}
