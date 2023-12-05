import { changeTaskStatus } from '../store/task';
import { done, inProgress, todo } from './status';

export const useTaskActions = (dispatch) => {
  const handleToDo = (id, status) => {
    if (status !== todo) {
      dispatch(changeTaskStatus({ id: id, status: todo }));
    }
  };

  const handleTakeToWork = (id, status) => {
    if (status !== inProgress) {
      dispatch(changeTaskStatus({ id: id, status: inProgress }));
    }
  };

  const handleDoneTask = (id, status) => {
    if (status !== done) {
      dispatch(changeTaskStatus({ id: id, status: done }));
    }
  };

  return {
    handleToDo,
    handleTakeToWork,
    handleDoneTask,
  };
};
