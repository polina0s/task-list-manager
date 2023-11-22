import { Task } from '../../../../components/task/task';
import { TaskList } from '../../../../components/task-list';

export function TaskColumn({
  tasks,
  onChangeStatus,
  openCreateTaskForm,
  deleteTaskById,
  editTaskById,
  name,
  id,
  onDeleteTag,
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
            {...(onChangeStatus
              ? { onChangeStatus: () => onChangeStatus(el.id) }
              : {})}
          />
        );
      })}
    </TaskList>
  );
}
