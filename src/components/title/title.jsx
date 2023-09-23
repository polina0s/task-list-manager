import Typography from '@mui/material/Typography';

export function Title({ ...props }) {
  return <Typography {...props}>{props.name}</Typography>;
}
