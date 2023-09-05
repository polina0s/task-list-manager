import Typography from '@mui/material/Typography';

export function Title({ size, marginBottom, name }) {
  return (
    <Typography
      variant={size}
      component="div"
      sx={{
        flexGrow: 1,
        fontFamily: 'Pacifico',
        color: '#4c031f',
        marginBottom: { marginBottom },
      }}
    >
      {name}
    </Typography>
  );
}
