import { Button as ButtonMui } from '@mui/material';

export function Button({ children, ...props }) {
  return (
    <ButtonMui variant="contained" color="secondary" {...props}>
      {children}
    </ButtonMui>
  );
}
