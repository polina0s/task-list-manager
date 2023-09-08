import { Button as ButtonMui } from '@mui/material';

export function Button({ name, size, href, type, component }) {
  return (
    <ButtonMui
      variant="contained"
      size={size}
      href={href}
      color="secondary"
      type={type}
      component={component}
    >
      {name}
    </ButtonMui>
  );
}
