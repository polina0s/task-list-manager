import { ThemeProvider } from '@emotion/react';
import { Button } from '@mui/material';
import { createTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';

import form from './form.module.scss';

export function Form({ header, btn }) {
  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#96063d',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#e6c1cf',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#e6c1cf',
      },
      '&:hover fieldset': {
        borderColor: '#e6c1cf',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#96063d',
      },
    },
  });

  const orange = createTheme({
    palette: {
      orange: {
        main: '#ffb99e',
        light: '#ffba9eb6',
        dark: '#f69873b6',
        contrastText: '#242105',
      },
    },
  });

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
    <ThemeProvider theme={orange}>
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
              <CssTextField
                {...register('login', {
                  required: 'required to fill out',
                  minLength: { value: 5, message: 'minimum 5 characters' },
                  maxLength: { value: 10, message: 'maximum 10 characters' },
                })}
                required
                label="Login"
                id="custom-css-outlined-input"
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
              <CssTextField
                {...register('password', {
                  required: 'required to fill out',
                  minLength: { value: 5, message: 'minimum 5 characters' },
                  maxLength: { value: 10, message: 'maximum 10 characters' },
                })}
                required
                label="Password"
                id="custom-css-outlined-input"
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
              color="orange"
              type="submit"
              className={form.formBtn}
            >
              {btn}
            </Button>
          </div>
        </Box>
      </div>
    </ThemeProvider>
  );
}
