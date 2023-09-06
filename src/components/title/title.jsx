import Typography from '@mui/material/Typography';

export function Title({ size, name, className, color }) {
  return (
    <Typography
      className={className}
      variant={size}
      component="div"
      color={color}
    >
      {name}
    </Typography>
  );
}
