import { connect } from 'react-redux';

import {
  searchBookmark,
  filterBookmark,
} from '../actions';
import BookmarkMenu from '../components/bookmark-menu.jsx';

const mapDispatchToProps = (dispatch) => ({
  onUpdateSearchBox: (text) => {
    dispatch(searchBookmark(text));
  },

  onUpdateFilterCheckbox: (filters) => {
    dispatch(filterBookmark(filters))
  },
});

const UpdatableBookmarkMenu = connect(null, mapDispatchToProps)(BookmarkMenu);

export default UpdatableBookmarkMenu;
