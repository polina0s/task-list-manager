import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';

export default function App() {
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
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField required id="outlined" label="Login" defaultValue="login" />

        <TextField
          required
          id="outlined"
          label="Password"
          defaultValue="password"
        />
      </div>
    </Box>
  );
}

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
