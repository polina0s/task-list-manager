import { editTaskStatus } from '../store/task';
import { done, inProgress } from './status';

export const useActions = (dispatch) => {
  const handleTakeToWork = (id) => {
    dispatch(editTaskStatus({ id: id, status: inProgress }));
  };

  const handleDoneTask = (id) => {
    dispatch(editTaskStatus({ id: id, status: done }));
  };

  return {
    handleTakeToWork,
    handleDoneTask,
  };
};
