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
      color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E0E3E7',
      },
      '&:hover fieldset': {
        borderColor: '#B2BAC2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6F7E8C',
      },
    },
  });

  const blue = createTheme({
    palette: {
      lightBlue: {
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
    alert(JSON.stringify(data));
    reset();
  };

  return (
    <ThemeProvider theme={blue}>
      <div className={form.formCont}>
        <Box
          component="form"
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
                {...register('firstName', {
                  required: 'required to fill out',
                  minLength: { value: 5, message: 'minimum 5 characters' },
                })}
                required
                onSubmit={handleSubmit(onSubmit)}
                label="Login"
                id="custom-css-outlined-input"
              />
            </div>
            <div style={{ height: 20 }}>
              {' '}
              {errors?.firstName && (
                <p>{errors?.firstName.message || 'Error!'}</p>
              )}{' '}
            </div>
            <div className={form.formInput}>
              <CssTextField
                required
                label="Password"
                id="custom-css-outlined-input"
              />
            </div>
          </div>
          <div>
            <Button
              variant="contained"
              color="lightBlue"
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

// const {
//   register,
//   formState: { errors },
//   handleSubmit,
//   reset,
// } = useForm({
//   mode: 'onBlur',
// });

// const onSubmit = (data) => {
//   alert(JSON.stringify(data));
//   reset();
// };

// <div>
//   <h1>Form</h1>
//   <form onSubmit={handleSubmit(onSubmit)}>
//     <label>
//       First Name:
//       <TextField label="Outlined secondary" color="secondary" />
//       <input
//         {...register('firstName', {
//           required: 'обязательно к заполнению',
//           minLength: { value: 5, message: 'минимум 5 символов' },
//         })}
//       />
//     </label>

//     <div style={{ height: 40 }}>
//       {errors?.firstName && <p>{errors?.firstName.message || 'Error!'}</p>}
//     </div>

//     <label>
//       Last Name:
//       <input
//         {...register('lastName', {
//           required: 'обязательно к заполнению',
//           minLength: { value: 5, message: 'минимум 5 символов' },
//         })}
//       />
//     </label>

//     <div style={{ height: 40 }}>
//       {errors?.lastName && <p>{errors?.lastName.message || 'Error!'}</p>}
//     </div>

//     <input type="submit" />
//   </form>
// </div>
