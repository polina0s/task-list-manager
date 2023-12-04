import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

import { Tag } from '../tag';
import { Title } from '../title';
import task from './task.module.scss';

export function Task({
  name,
  id,
  onDelete,
  onEdit,
  returnToPrevStatus,
  moveToNextStatus,
  onChangeStatus,
  tags,
  onDeleteTag,
}) {
  return (
    <div className={task.cont} id={id}>
      <div className={task.titleCont}>
        <div className={task.nameCont}>
          <AutoAwesomeIcon className={task.titleIcon} color="secondary" />
          <Title className={task.name} color="secondary">
            {name}
          </Title>
        </div>
        <div className={task.buttons}>
          <IconButton onClick={onEdit}>
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton onClick={onDelete}>
            <DeleteOutlineIcon color="secondary" />
          </IconButton>
          {returnToPrevStatus ? (
            <IconButton color="secondary" onClick={returnToPrevStatus}>
              <ArrowBackIcon />
            </IconButton>
          ) : null}
          {moveToNextStatus ? (
            <IconButton color="secondary" onClick={moveToNextStatus}>
              <ArrowForwardIcon />
            </IconButton>
          ) : null}
          {onChangeStatus ? (
            <IconButton color="secondary" onClick={onChangeStatus}>
              <ArrowForwardIcon />
            </IconButton>
          ) : null}
        </div>
      </div>
      {!!tags?.length && (
        <div className={task.taskTags}>
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              id={tag.id}
              color={tag.color}
              name={tag.name}
              onDeleteTag={() => onDeleteTag(tag.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
