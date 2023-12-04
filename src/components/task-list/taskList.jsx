import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { forwardRef } from 'react';

import { useBreakpoints } from '../../utils/useBreakpoints';
import { Title } from '../title';
import list from './taskList.module.scss';

// export const Input = forwardRef(function Input(props, ref) {
//   return <TextField {...props} ref={ref} color="secondary" />;
// });

export const TaskList = forwardRef(function TaskList(
  { name, onAdd, onMore, children, isOver },
  ref,
) {
  const breakpoints = useBreakpoints();

  return (
    <Grid item xs={breakpoints.md ? 12 : 4} ref={ref}>
      <div className={list.cont} style={{ backgroundColor: isOver && 'red' }}>
        <div className={list.header}>
          <Title className={list.name} variant="h6">
            {name}
          </Title>
          <div>
            {onAdd && (
              <IconButton color="primary" onClick={onAdd}>
                <AddIcon />
              </IconButton>
            )}
            {onMore && (
              <IconButton color="primary" onClick={onMore} type="submit">
                <MoreHorizIcon />
              </IconButton>
            )}
          </div>
        </div>
        {children}
      </div>
    </Grid>
  );
});
