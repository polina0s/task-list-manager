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
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <Title size="h4" name={header} marginBottom="20px" />
        <div className={form.formInputCont}>
          <div className={form.formInput}>
            <Input
              color="secondary"
              id="outlined-required"
              required
              label="login"
              {...register('login', {
                required: 'required to fill out',
              })}
            />
            <div className={form.inputErrorMessageCont}>
              {' '}
              {errors?.login && (
                <p className={form.inputErrorMessage}>
                  {errors?.login.message || 'Error!'}
                </p>
              )}{' '}
            </div>
          </div>
          <div className={form.formInput}>
            <Input
              color="secondary"
              id="outlined-required"
              required
              label="password"
              {...register('password', {
                required: 'required to fill out',
                minLength: { value: 8, message: 'minimum 8 characters' },
              })}
            />
            <div className={form.inputErrorMessageCont}>
              {' '}
              {errors?.password && (
                <p className={form.inputErrorMessage}>
                  {errors?.password.message || 'Error!'}
                </p>
              )}{' '}
            </div>
          </div>
        </div>
        <div>
          <Btn name={btn} />
        </div>
      </Box>
    </div>
  );
}
