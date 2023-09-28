import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';

import { Title } from '../title';
import task from './task.module.scss';

export function Task({ name }) {
  return (
    <div className={task.cont}>
      <div className={task.titleCont}>
        <div className={task.nameCont}>
          <AutoAwesomeIcon className={task.titleIcon} color="secondary" />
          <Title name={name} color="secondary" />
        </div>
        <div>
          <IconButton>
            <DeleteOutlineIcon color="secondary" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
