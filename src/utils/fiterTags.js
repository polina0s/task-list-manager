export function filterTagsById(arr, id) {
  return arr.filter((tag) => tag.id !== id);
}
