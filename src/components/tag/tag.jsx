import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';

import tag from './tag.module.scss';

export function Tag({ color, name, onDeleteTag }) {
  return (
    <div className={tag.cont} style={{ backgroundColor: color }}>
      <p className={tag.name}>{name}</p>
      <IconButton className={tag.button} onClick={onDeleteTag}>
        <ClearIcon className={tag.buttonIcon} />
      </IconButton>
    </div>
  );
}
