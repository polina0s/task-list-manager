import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router';

import { Task } from '../../../../components/task/task';
import { TaskList } from '../../../../components/task-list';
import { ItemTypes } from '../../../../utils';

export function TaskColumn({
  tasks,
  name,
  openCreateTaskForm,
  deleteTaskById,
  editTaskById,
  status,
  id,
  onDeleteTag,
  returnToPrevStatus,
  moveToNextStatus,
  onChangeStatus,
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item) => onChangeStatus(item.id, item.status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const navigate = useNavigate();

  return (
    <TaskList
      onAdd={openCreateTaskForm}
      name={name}
      id={id}
      ref={drop}
      isOver={isOver}
    >
      {tasks.map((el) => {
        return (
          <Task
            status={status}
            tags={el.tags}
            name={el.text}
            id={el.id}
            key={el.id}
            onDelete={() => deleteTaskById(el.id)}
            onEdit={() => {
              navigate(`${el.id}`);
              editTaskById(el.id);
            }}
            onDeleteTag={(tagId) => onDeleteTag(el, tagId)}
            {...(returnToPrevStatus
              ? { returnToPrevStatus: () => returnToPrevStatus(el.id) }
              : {})}
            {...(moveToNextStatus
              ? { moveToNextStatus: () => moveToNextStatus(el.id) }
              : {})}
          />
        );
      })}
    </TaskList>
  );
}
