import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { CirclePicker } from 'react-color';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '../button/button';
import { Input } from '../input/input';
import { Title } from '../title';
import tag from './tagForm.module.scss';

const schema = yup.object().shape({
  text: yup.string().required('this field is required').trim().min(1),
});

export function TagForm({ onClose, onSubmit, open, title, btnText }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    values: { text: '' },
    shouldUnregister: true,
    resolver: yupResolver(schema),
  });

  const [tagColor, setTagColor] = useState('');

  const handleChangeColor = (color) => {
    setTagColor(color);
    console.log(color);
    console.log(tagColor);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className={tag.cont}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <div className={tag.titleCont}>
          <Title color="secondary" variant="h6">
            {title}
          </Title>
          <IconButton onClick={onClose}>
            <CloseIcon color="secondary" />
          </IconButton>
        </div>
        <Input
          className={tag.input}
          label="task text"
          helperText={errors?.text?.message}
          {...register('text')}
        />
        <div className={tag.paletteCont}>
          <CirclePicker onChange={handleChangeColor} />
        </div>
        <Button type="submit">{btnText}</Button>
      </Box>
    </Modal>
  );
}
