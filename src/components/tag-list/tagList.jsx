import FormGroup from '@mui/material/FormGroup';
import Popover from '@mui/material/Popover';
import { useMemo } from 'react';

import { Button } from '../button/button';
import { TagCheckbox } from '../tag-checkbox';
import { Title } from '../title';
import tagList from './tagList.module.scss';

export function TagList({
  open,
  anchorEl,
  onClose,
  onOpenTagForm,
  tags,
  onCheck,
  handleEditTagById,
  onDeleteTagFromList,
  checkedTags = [],
}) {
  const checkedMap = useMemo(() => {
    const checkedMap = new Map();
    checkedTags.forEach((tag) => checkedMap.set(tag, true));
    return checkedMap;
  }, [checkedTags]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      slotProps={{ paper: { className: tagList.popover } }}
    >
      <Title color="secondary">Tags</Title>
      <div>
        <FormGroup className={tagList.list}>
          {tags.length > 0 ? (
            tags.map((tag) => (
              <TagCheckbox
                key={tag.id}
                onCheck={onCheck}
                onOpenEditForm={() => handleEditTagById(tag.id)}
                label={tag.name}
                id={tag.id}
                color={tag.color}
                onDelete={() => onDeleteTagFromList(tag.id)}
                checked={!!checkedMap.get(tag.id)}
              />
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
        <Button onClick={onOpenTagForm}>Create new tag</Button>
      </div>
    </Popover>
  );
}
