import Box from '@mui/material/Box';
import TextField from '@mui/material/Button';
import * as React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
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
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />

        <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
    </Box>
  );
}
