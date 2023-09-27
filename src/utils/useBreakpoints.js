import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

export function useBreakpoints() {
  const theme = useTheme();

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  const xl = width <= theme.breakpoints.values.xl;
  const lg = width <= theme.breakpoints.values.lg;
  const md = width <= theme.breakpoints.values.md;
  const sm = width <= theme.breakpoints.values.sm;

  return {
    xl,
    lg,
    md,
    sm,
  };
}
