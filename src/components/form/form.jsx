import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';

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
        <p className={form.formHeader}>{header}</p>
        <div className={form.formInputCont}>
          <div className={form.formInput}>
            <TextField
              {...register('login', {
                required: 'required to fill out',
                minLength: { value: 1, message: 'minimum 1 characters' },
              })}
              required
              id="outlined-required"
              label="Login"
              color="secondary"
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
            <TextField
              {...register('password', {
                required: 'required to fill out',
                minLength: { value: 8, message: 'minimum 8 characters' },
              })}
              required
              id="outlined-required"
              label="Password"
              color="secondary"
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
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className={form.formBtn}
          >
            {btn}
          </Button>
        </div>
      </Box>
    </div>
  );
}
