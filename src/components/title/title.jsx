import Typography from '@mui/material/Typography';

export function Title({ size, name, className, color, component }) {
  return (
    <Typography
      className={className}
      variant={size}
      component={component}
      color={color}
    >
      {name}
    </Typography>
  );
}
