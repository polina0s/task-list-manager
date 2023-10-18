import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

import { Title } from '../title';
import task from './task.module.scss';

export function Task({ name, id, onDelete, onEdit }) {
  return (
    <div className={task.cont} id={id}>
      <div className={task.titleCont}>
        <div className={task.nameCont}>
          <AutoAwesomeIcon className={task.titleIcon} color="secondary" />
          <Title color="secondary">{name}</Title>
        </div>
        <div>
          <IconButton onClick={onEdit}>
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton onClick={onDelete}>
            <DeleteOutlineIcon color="secondary" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
