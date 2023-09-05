import { Button } from '@mui/material';

export function Btn({ name }) {
  return (
    <Button variant="contained" color="secondary" type="submit">
      {name}
    </Button>
  );
}
