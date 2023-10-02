import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';

import { Title } from '../../components/title';
import task from './task.module.scss';

export function Task({ name, id }) {
  return (
    <div className={task.cont} id={id}>
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