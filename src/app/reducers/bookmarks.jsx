import mockBookmarks from '../mock-bookmarks.jsx';

const initBookmarks = mockBookmarks.map(b => Object.assign({}, b, {note: ''}));

export const bookmarks = (state = initBookmarks, action) => {
  switch (action.type) {
    case 'EDIT_BOOKMARK_NOTE':
      return state.map(b => (
        b.id === action.id ? Object.assign({}, b, {note: action.note}) : b
      ))
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
