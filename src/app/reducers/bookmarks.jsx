import mockBookmarks from '../mock-bookmarks.jsx';

export const bookmarks = (state = mockBookmarks, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const selected = (state = null, action) => {
  switch (action.type) {
    case 'SELECT_BOOKMARK':
      return action.id;
    default:
      return state;
  }
};
