import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import { Title } from '../../components/title';
import { useBreakpoints } from '../../utils/useBreakpoints';
import list from './taskList.module.scss';

export function TaskList({ name, onAddClick, onMoreClick }) {
  const breakpoints = useBreakpoints();

  return (
    <Grid item xs={breakpoints.md ? 12 : 4}>
      <div className={list.cont}>
        <div className={list.header}>
          <Title className={list.name} variant="h6" name={name} />
          <div>
            <IconButton color="primary" onClick={onAddClick}>
              <AddIcon />
            </IconButton>
            <IconButton color="primary" onClick={onMoreClick}>
              <MoreHorizIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </Grid>
  );
}
