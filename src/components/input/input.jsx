import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';

export const Input = forwardRef(function Input(props, ref) {
  const { ...otherProps } = props;

  return (
    <>
      <TextField {...otherProps} ref={ref} color="secondary" />
    </>
  );
});
