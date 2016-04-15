export const initBookmarks = (bookmarks) => ({
  type: 'INIT_BOOKMARKS',
  bookmarks,
});

export const selectBookmark = (id) => ({
  type: 'SELECT_BOOKMARK',
  id,
});

export const editBookmarkNote = (id, note) => ({
  type: 'EDIT_BOOKMARK_NOTE',
  id,
  note,
});
