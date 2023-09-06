import { Button } from '@mui/material';

export function Btn({ name, size }) {
  return (
    <Button variant="contained" size={size} color="secondary" type="submit">
      {name}
    </Button>
  );
}
