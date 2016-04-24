export const initBookmarks = (bookmarks) => ({
  type: 'INIT_BOOKMARKS',
  bookmarks,
});

export const selectBookmark = (id) => ({
  type: 'SELECT_BOOKMARK',
  id,
});

/**
 *
 * @param {string} id - Bookmark ID.
 * @param {object} updated - Bookmark content to update, keyed on content type.
 */
export const editBookmarkNote = (id, updated) => ({
  type: 'EDIT_BOOKMARK_NOTE',
  id,
  updated
});
