import Typography from '@mui/material/Typography';

export function Title({ size, name, className }) {
  return (
    <Typography
      className={className}
      variant={size}
      component="div"
      sx={{
        flexGrow: 1,
        fontFamily: 'Pacifico',
        color: '#4c031f',
        marginBottom: '20px',
      }}
    >
      {name}
    </Typography>
  );
}
