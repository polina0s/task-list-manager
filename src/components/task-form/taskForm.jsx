import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
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
  onButtonAddTag,
  onSubmit,
  openTaskForm,
  title,
  btnText,
  text,
  buttonRef,
  tags = [],
  renderTagForm,
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
        <div className={form.titleCont}>
          <Title color="secondary" variant="h6">
            {title}
          </Title>
          <IconButton onClick={onClose}>
            <CloseIcon color="secondary" />
          </IconButton>
        </div>
        <div className={form.tagsCont} ref={buttonRef}>
          <Button onClick={onButtonAddTag}>
            <LocalOfferOutlinedIcon
              color="primary"
              className={form.tagsBtnIcon}
            />
            <Title color="primary">add tags</Title>
          </Button>
          <Controller
            render={({ field: { value } }) => {
              console.log(value);
              return renderTagForm({
                onCheck: setTags,
                checkedTags: value,
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
      </Box>
    </Modal>
  );
}
