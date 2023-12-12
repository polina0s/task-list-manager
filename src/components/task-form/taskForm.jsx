import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '../button/button';
import { Input } from '../input/input';
import { Title } from '../title';
import form from './taskForm.module.scss';

const schema = yup.object().shape({
  text: yup.string().required('this field is required').trim().min(1),
});

export function TaskForm({
  onClose,
  onSubmit,
  openTaskForm,
  title,
  btnText,
  text,
  tags = [],
  renderTagForm,
  isLoading,
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    getValues,
  } = useForm({
    mode: 'onBlur',
    values: { text: text, tags: tags },
    shouldUnregister: true,
    resolver: yupResolver(schema),
  });

  const buttonRef = useRef(null);

  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const setTags = ({ id, checked }) => {
    const oldTags = getValues('tags');
    if (checked) {
      setValue('tags', [...oldTags, id]);
    } else {
      const newTags = oldTags.filter((tag) => tag !== id);
      setValue('tags', newTags);
    }
  };

  return (
    <Modal open={openTaskForm} onClose={onClose}>
      <Box
        className={form.cont}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        {isLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <>
            <div className={form.titleCont}>
              <Title color="secondary" variant="h6">
                {title}
              </Title>
              <IconButton onClick={onClose}>
                <CloseIcon color="secondary" />
              </IconButton>
            </div>
            <div className={form.tagsCont} ref={buttonRef}>
              <Button onClick={handleClick}>
                <LocalOfferOutlinedIcon
                  color="primary"
                  className={form.tagsBtnIcon}
                />
                <Title color="primary">add tags</Title>
              </Button>
              <Controller
                render={({ field: { value } }) => {
                  return renderTagForm({
                    onCheck: setTags,
                    checkedTags: value,
                    open: open,
                    anchorEl: buttonRef.current,
                    onClose: handleClose,
                  });
                }}
                name="tags"
                control={control}
              />
            </div>
            <Input
              className={form.input}
              label="task text"
              helperText={errors?.text?.message}
              {...register('text')}
            />
            <Button type="submit">{btnText}</Button>
          </>
        )}
      </Box>
    </Modal>
  );
}
