import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import { useBreakpoints } from '../../utils/useBreakpoints';
import { Title } from '../title';
import list from './taskList.module.scss';

export function TaskList({ name, onAddClick, onMoreClick, child }) {
  const breakpoints = useBreakpoints();

  return (
    <Grid item xs={breakpoints.md ? 12 : 4}>
      <div className={list.cont}>
        <div className={list.header}>
          <Title className={list.name} variant="h6" name={name} />
          <div>
            {name === 'to do' ? (
              <IconButton color="primary" onClick={onAddClick}>
                <AddIcon />
              </IconButton>
            ) : null}
            <IconButton color="primary" onClick={onMoreClick}>
              <MoreHorizIcon />
            </IconButton>
          </div>
        </div>
        {child}
      </div>
    </Grid>
  );
}
