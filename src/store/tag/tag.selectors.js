import { createSelector } from 'reselect';

export const allTagsSelector = (state) => state.tag.tags;

export const tagByIdSelector = createSelector(
  [allTagsSelector, (_, id) => id],
  (tags, id) => {
    return tags.find((tag) => tag.id === id);
  },
);
