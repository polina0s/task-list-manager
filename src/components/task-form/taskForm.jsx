import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '../button/button';
import { Input } from '../input/input';
import { Title } from '../title';
import form from './taskForm.module.scss';

const schema = yup.object().shape({
  text: yup.string().required('this field is required').trim().min(1),
});

export function TaskForm({ onClose, onSubmit, open }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    defaultValues: { text: '' },
    shouldUnregister: true,
    resolver: yupResolver(schema),
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className={form.cont}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <div className={form.titleCont}>
          <Title color="secondary" variant="h6">
            Create task
          </Title>
          <IconButton onClick={onClose}>
            <CloseIcon color="secondary" />
          </IconButton>
        </div>
        <Input
          className={form.input}
          label="task text"
          helperText={errors?.text?.message}
          {...register('text')}
        />
        <Button type="submit">Add task</Button>
      </Box>
    </Modal>
  );
}
