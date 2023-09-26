import { useTheme } from '@mui/material/styles';

export function useBreakpoints() {
  const theme = useTheme();
  const size = window.innerWidth;

  const xl = size <= theme.breakpoints.values.xl;
  const lg = size <= theme.breakpoints.values.lg;
  const md = size <= theme.breakpoints.values.md;
  const sm = size <= theme.breakpoints.values.sm;

  return {
    xl,
    lg,
    md,
    sm,
  };
}
