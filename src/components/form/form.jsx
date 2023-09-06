import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';

import { Btn } from '../button';
import { Input } from '../input';
import { Title } from '../title';
import form from './form.module.scss';

export function Form({ header, btn }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    reset();
  };

  return (
    <div className={form.formCont}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Title className={form.formTitle} size="h4" name={header} />
        <div className={form.formInputCont}>
          <Input
            // {errors?.login ? error helperText={errors?.login.message} :
            id="outlined-required"
            required
            label="login"
            helperText={errors?.login?.message || ''}
            {...register('login', {
              required: 'required to fill out',
            })}
          />

          <Input
            id="outlined-required"
            required
            label="password"
            helperText={errors?.password?.message || ''}
            {...register('password', {
              required: 'required to fill out',
              minLength: { value: 8, message: 'minimum 8 characters' },
            })}
          />
        </div>
        <Btn name={btn} />
      </Box>
    </div>
  );
}
