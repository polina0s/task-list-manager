import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { Button } from '../button/button';
import { Title } from '../title';
import modal from './confirmModal.module.scss';

export function ConfirmModal({ onClose, onDelete, open, id }) {
  return (
    <Modal open={open} onClose={onClose} id={id}>
      <Box className={modal.cont}>
        <div className={modal.titleCont}>
          <Title color="secondary" variant="h6">
            Are you sure you want to delete the task?
          </Title>
          <IconButton onClick={onClose}>
            <CloseIcon color="secondary" />
          </IconButton>
        </div>
        <div className={modal.btnCont}>
          <Button onClick={onDelete}>DELETE</Button>
          <Button onClick={onClose}>CANCEL</Button>
        </div>
      </Box>
    </Modal>
  );
}
