import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import tag from './tagCheckbox.module.scss';

export function TagCheckbox({ onCheck, onOpenEditForm, label, id, color }) {
  return (
    <div className={tag.cont}>
      <FormControlLabel
        control={<Checkbox color="secondary" onChange={onCheck} />}
        label={label}
        id={id}
      />
      <span className={tag.color} style={{ backgroundColor: color }} />
      <IconButton onClick={onOpenEditForm}>
        <EditIcon color="secondary" />
      </IconButton>
    </div>
  );
}
