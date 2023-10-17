export function filterTasksByStatus(arr, status) {
  return arr.filter((task) => task.status === status);
}

export function filterTasksById(arr, id) {
  return arr.filter((task) => task.id !== id);
}
