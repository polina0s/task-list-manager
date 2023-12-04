import { changeTaskStatus } from '../store/task';
import { done, inProgress, todo } from './status';

export const useTaskActions = (dispatch) => {
  const handleToDo = (id) => {
    dispatch(changeTaskStatus({ id: id, status: todo }));
  };

  const handleTakeToWork = (id) => {
    dispatch(changeTaskStatus({ id: id, status: inProgress }));
  };

  const handleDoneTask = (id) => {
    dispatch(changeTaskStatus({ id: id, status: done }));
  };

  return {
    handleToDo,
    handleTakeToWork,
    handleDoneTask,
  };
};
