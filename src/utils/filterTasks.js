export function filterTasks(arr, status) {
  return arr.filter((task) => task.status === status);
}
