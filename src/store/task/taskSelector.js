import { createSelector } from 'reselect';

export const selectAllTasks = (state) => state.task.tasks;

export const selectTask = createSelector(
  [selectAllTasks, (_, id) => id],
  (tasks, id) => {
    return tasks.find((task) => task.id === id);
  },
);
