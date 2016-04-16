import api from '../api.js';

export const bookmarks = (state = [], action) => {
  switch (action.type) {
    case 'EDIT_BOOKMARK_NOTE':
      return state.map(b => (
        b.id === action.id ? Object.assign({}, b, {note: action.note}) : b
      ));
    case 'INIT_BOOKMARKS':
      return action.bookmarks;
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
    default:
      return state;
  }
};
