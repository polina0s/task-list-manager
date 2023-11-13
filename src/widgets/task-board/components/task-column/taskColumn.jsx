import { Task } from '../../../../components/task/task';
import { TaskList } from '../../../../components/task-list';

export function TaskColumn({
  tasks,
  onChangeStatus,
  openCreateTaskForm,
  openMenu,
  deleteTaskById,
  editTaskById,
  name,
  id,
}) {
  return (
    <TaskList onAdd={openCreateTaskForm} onMore={openMenu} name={name} id={id}>
      {tasks.map((el) => (
        <Task
          name={el.text}
          id={el.id}
          key={el.id}
          onDelete={() => deleteTaskById(el.id)}
          onEdit={() => editTaskById(el.id)}
          {...(onChangeStatus
            ? { onChangeStatus: () => onChangeStatus(el.id) }
            : 'null')}
        />
      ))}
    </TaskList>
  );
}
