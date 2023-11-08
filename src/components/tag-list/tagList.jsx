import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Popover from '@mui/material/Popover';

import { Button } from '../button/button';
import { Title } from '../title';
import tagList from './tagList.module.scss';

export function TagList({
  open,
  anchorEl,
  onClose,
  tags,
  onOpenTagForm,
  onOpenEdit,
  onCheck,
}) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      slotProps={{ paper: { className: tagList.tagsForm } }}
    >
      <Title color="secondary" className={tagList.tagsFormTitle}>
        Tags
      </Title>
      <div>
        <FormGroup className={tagList.tagList}>
          {tags.length > 0 ? (
            tags.map((tag) => (
              <div className={tagList.tagCont} key={tag.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      className={tagList.tag}
                      onChange={onCheck}
                    />
                  }
                  label={tag.name}
                  key={tag.id}
                />
                <span
                  className={tagList.tagColor}
                  style={{ backgroundColor: tag.color }}
                />
                <IconButton onClick={onOpenEdit}>
                  <EditIcon color="secondary" />
                </IconButton>
              </div>
            ))
          ) : (
            <Title
              className={tagList.message}
              color="secondary"
              variant="h4"
              fontFamily="Roboto"
            >
              No tags
            </Title>
          )}
        </FormGroup>
        <Button onClick={onOpenTagForm}> Create new tag </Button>
      </div>
    </Popover>
  );
}
