import { Task } from '../../../../components/task/task';
import { TaskList } from '../../../../components/task-list';

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
}) {
  return (
    <TaskList onAdd={openCreateTaskForm} name={name} id={id}>
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
