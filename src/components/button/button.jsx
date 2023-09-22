import { Button as ButtonMui } from '@mui/material';

export function Button({ ...props }) {
  return (
    <ButtonMui variant="contained" color="secondary" {...props}>
      {props.name}
    </ButtonMui>
  );
}
