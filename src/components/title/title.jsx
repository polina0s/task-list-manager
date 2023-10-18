import Typography from '@mui/material/Typography';

export function Title({ children, ...props }) {
  return <Typography {...props}>{children}</Typography>;
}
