import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CirclePicker } from 'react-color';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { colors } from '../../utils';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { Title } from '../title';
import tag from './tagForm.module.scss';

const schema = yup.object().shape({
  text: yup.string().required('this field is required').trim().min(1),
  color: yup.string().required(),
});

export function TagForm({
  onClose,
  onSubmit,
  open,
  title,
  btnText,
  text = '',
  color = '',
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    mode: 'onBlur',
    values: { text: text, color: color ?? '' },
    shouldUnregister: true,
    resolver: yupResolver(schema),
  });

  const handleChangeColor = (color) => {
    setValue('color', color.hex);
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
          label="tag text"
          helperText={errors?.text?.message}
          {...register('text')}
        />
        <div className={tag.paletteCont}>
          <Controller
            render={({ field: { value } }) => (
              <CirclePicker
                color={value}
                onChange={handleChangeColor}
                colors={colors}
              />
            )}
            name="color"
            control={control}
          />
        </div>
        <Button type="submit">{btnText}</Button>
      </Box>
    </Modal>
  );
}
