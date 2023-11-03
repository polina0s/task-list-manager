import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Popover from '@mui/material/Popover';

import { Button } from '../button/button';
import { Title } from '../title';
import tag from './tagPopover.module.scss';

export function TagPopover({ open, anchorEl, onClose, tags, onOpenTagForm }) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      slotProps={{ paper: { className: tag.tagsForm } }}
    >
      <Title color="secondary" className={tag.tagsFormTitle}>
        Tags
      </Title>
      <div>
        <FormGroup className={tag.tagList}>
          {tags.length > 0 ? (
            tags.map((tag) => (
              <FormControlLabel
                control={<Checkbox color="secondary" className={tag.tag} />}
                label={tag.name}
                key={tag.id}
                sx={{ backgroundColor: tag.color }}
              />
            ))
          ) : (
            <Title
              className={tag.message}
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
