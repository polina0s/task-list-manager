import { createSelector } from 'reselect';

export const allTasksSelector = (state) => state.task.tasks;

export const taskByIdSelector = createSelector(
  [allTasksSelector, (_, id) => id],
  (tasks, id) => {
    return tasks.find((task) => task.id === id);
  },
);

export const tagsByTaskIdSelector = createSelector(taskByIdSelector, (task) => {
  const tags = task?.tags;
  return tags?.map((tag) => tag.id);
});
