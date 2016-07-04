/**
 * Initialization.
 *
 * @param {array} bookmarks - Book mark data from server.
 */
export const initBookmarks = (bookmarks) => ({
  type: 'INIT_BOOKMARKS',
  bookmarks,
});

/**
 * Action for bookmark selection.
 *
 * @param {string} id - Bookmark ID.
 */
export const selectBookmark = (id) => ({
  type: 'SELECT_BOOKMARK',
  id,
});

/**
 * Action for updating note (with corresponding fields).
 *
 * @param {string} id - Bookmark ID.
 * @param {object} updated - Bookmark content to update, keyed on content type.
 */
export const editBookmarkNote = (id, updated) => ({
  type: 'EDIT_BOOKMARK_NOTE',
  id,
  updated
});

/**
 * Action for bookmark searching.
 *
 * @param  {string} text - String to search.
 */
export const searchBookmark = (text) => ({
  type: 'SEARCH_BOOKMARK',
  text
});

/**
 * Action for bookmark filtering.
 *
 * @param  {object} filters - An object keyed on 3 different filters:
 *     'good', 'bad', 'willTry'.
 */
export const filterBookmark = (filters) => ({
  type: 'FILTER_BOOKMARK',
  filters
});