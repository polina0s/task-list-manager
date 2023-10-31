import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Popover from '@mui/material/Popover';

import { Title } from '../title';
import tag from './tagForm.module.scss';

export function TagForm({ id, open, anchorEl, onClose, tags }) {
  return (
    <Popover
      id={id}
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
        <FormGroup>
          {tags ? (
            tags.map((tag) => (
              <FormControlLabel
                control={<Checkbox />}
                label={tag.name}
                key={tag.id}
              />
            ))
          ) : (
            <Title>no tags</Title>
          )}
          {/* <FormControlLabel
            control={<Checkbox />}
            label="zalupa"
            onChange={onChange}
          />
          <FormControlLabel control={<Checkbox />} label="konya" />
          <FormControlLabel control={<Checkbox />} label="aaaaaaaa" /> */}
        </FormGroup>
      </div>
    </Popover>
  );
}
