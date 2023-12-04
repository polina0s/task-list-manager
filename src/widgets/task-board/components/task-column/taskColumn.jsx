import { useDrop } from 'react-dnd';

import { Task } from '../../../../components/task/task';
import { TaskList } from '../../../../components/task-list';
import { ItemTypes } from '../../../../utils';

export function TaskColumn({
  tasks,
  openCreateTaskForm,
  deleteTaskById,
  editTaskById,
  name,
  id,
  onDeleteTag,
  returnToPrevStatus,
  moveToNextStatus,
  onChangeStatus,
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item) => onChangeStatus(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

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
            tags={el.tags}
            name={el.text}
            id={el.id}
            key={el.id}
            onDelete={() => deleteTaskById(el.id)}
            onEdit={() => editTaskById(el.id)}
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
