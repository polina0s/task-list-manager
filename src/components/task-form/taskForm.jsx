import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
// import EastIcon from '@mui/icons-material/East';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Modal from '@mui/material/Modal';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
// import { CirclePicker } from 'react-color';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '../button/button';
import { Input } from '../input/input';
import { Title } from '../title';
import form from './taskForm.module.scss';

const schema = yup.object().shape({
  text: yup.string().required('this field is required').trim().min(1),
});

export function TaskForm({ onClose, onSubmit, open, title, btnText, text }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    values: { text: text },
    shouldUnregister: true,
    resolver: yupResolver(schema),
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openn = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
            {title}
          </Title>
          <IconButton onClick={onClose}>
            <CloseIcon color="secondary" />
          </IconButton>
        </div>
        <div className={form.tagsCont}>
          <Button onClick={handleClick}>
            <LocalOfferOutlinedIcon
              color="primary"
              className={form.tagsBtnIcon}
            />
            <Title color="primary">add tags</Title>
          </Button>
          <Popover
            id={id}
            open={openn}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            slotProps={{ paper: { className: form.tagsForm } }}
          >
            <Title color="secondary" className={form.tagsFormTitle}>
              Tags
            </Title>
            <div>
              <FormGroup>
                <FormControlLabel control={<Checkbox />}>
                  <span className={form.tag}></span>
                </FormControlLabel>
                <FormControlLabel control={<Checkbox />} />
                <FormControlLabel control={<Checkbox />} />
              </FormGroup>
            </div>
          </Popover>
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
