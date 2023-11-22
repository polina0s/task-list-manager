import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import tag from './tagCheckbox.module.scss';

export function TagCheckbox({
  onCheck,
  onOpenEditForm,
  label,
  id,
  color,
  onDelete,
  checked = false,
}) {
  return (
    <div className={tag.cont}>
      <div className={tag.checkboxCont}>
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              onChange={(e) => onCheck({ id, checked: e.target.checked })}
              checked={checked}
            />
          }
          label={label}
          id={id}
          classes={{ label: tag.label }}
        />
        <span className={tag.color} style={{ backgroundColor: color }} />
      </div>
      <div className={tag.btnCont}>
        <IconButton onClick={onOpenEditForm}>
          <EditIcon color="secondary" />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteOutlineIcon color="secondary" />
        </IconButton>
      </div>
    </div>
  );
}
