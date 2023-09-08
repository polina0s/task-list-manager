import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';

export const Input = forwardRef(function Input(props, ref) {
  return <TextField {...props} ref={ref} color="secondary" />;
});
