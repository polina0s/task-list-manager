import { changeTaskStatus } from '../store/task';
import { done, inProgress, todo } from './status';

export const useTaskActions = (dispatch) => {
  const handleToDo = (id, status) => {
    if (status !== 'to do') {
      dispatch(changeTaskStatus({ id: id, status: todo }));
    }
    return;
  };

  const handleTakeToWork = (id, status) => {
    if (status !== inProgress) {
      dispatch(changeTaskStatus({ id: id, status: inProgress }));
    }
    return;
  };

  const handleDoneTask = (id, status) => {
    if (status !== done) {
      dispatch(changeTaskStatus({ id: id, status: done }));
    }
    return;
  };

  return {
    handleToDo,
    handleTakeToWork,
    handleDoneTask,
  };
};
