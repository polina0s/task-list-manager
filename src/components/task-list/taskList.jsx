import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import { Title } from '../../components/title';
import list from './taskList.module.scss';

export function TaskList({ name }) {
  return (
    <Grid item xs={4}>
      <div className={list.cont}>
        <div className={list.header}>
          <Title name={name} />
          <IconButton color="primary">
            <MoreHorizIcon />
          </IconButton>
        </div>
      </div>
    </Grid>
  );
}
