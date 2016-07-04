import { Visibility } from '../util';

export const bookmarks = (state = [], action) => {
  switch (action.type) {
    case 'EDIT_BOOKMARK_NOTE':
      return state.map(b => (
        // Overwrite with updated content.
        b.id === action.id ? Object.assign({}, b, action.updated) : b
      ));
    case 'INIT_BOOKMARKS':
      return action.bookmarks;
    case 'SEARCH_BOOKMARK':
      return state.map(b =>
        Object.assign({}, b,
          { visible: matchSearch(action.text, b) })
      );
    case 'FILTER_BOOKMARK':
      const filters = action.filters;
      return state.map(b =>
        Object.assign({}, b,
          { visible: matchFilters(action.filters, b) })
      );
    default:
      return state;
  }
};

export const selected = (state = null, action) => {
  switch (action.type) {
    case 'SELECT_BOOKMARK':
      if (state === action.id) {
        // Unselect.
        return null;
      } else {
        return action.id;
      }
    case 'EDIT_BOOKMARK_NOTE':
      // Focus on currently selected bookmark.
      return action.id;
    default:
      return state;
  }
};

/**
 * Match a bookmark with the input search string.
 *
 * Match by simple boolean AND, while token such as 'c:ramen' will try to match
 * categories.
 *
 * @param {string} searchStr - Input string to search.
 * @param {object} bookmark - Model of bookmark.
 * @returns {Visibility} - Bitmask of visibility.
 */
function matchSearch(searchStr, bookmark) {
  const categories = bookmark.categories.map(s => s.toLowerCase());
  const name = bookmark.name.toLowerCase();
  for (const token of searchStr.toLowerCase().split(/ +/)) {
    if (token.startsWith('c:')) {
      // Match by category.
      if (!categories.some(c => c.startsWith(token.substr(2)))) {
        return bookmark.visible | Visibility.FILTER_BY_SEARCH;
      }
    } else {
      // Match by name.
      if (!name.includes(token)) {
        return bookmark.visible | Visibility.FILTER_BY_SEARCH;
      }
    }
  }
  // Unfilter.
  return bookmark.visible & ~Visibility.FILTER_BY_SEARCH;
}

/**
 * Match a bookmark with filters.
 *
 * @param {object} filters - An object keyed on 'good', 'bad' and 'willTry'.
 * @param {object} bookmark - Model of bookmark
 * @returns {Visibility} - Bitmask of visibility.
 */
function matchFilters(filters, bookmark) {
  if (bookmark.mark && !filters[bookmark.mark]) {
    // Marked and should filter.
    return bookmark.visible | Visibility.FILTER_BY_MARK;
  } else if (!bookmark.mark && !filters.willTry) {
    // Not marked and should filter.
    return bookmark.visible | Visibility.FILTER_BY_MARK;
  } else {
    // Unfilter.
    return bookmark.visible & ~Visibility.FILTER_BY_MARK;
  }
}
