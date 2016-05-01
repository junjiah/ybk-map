import { connect } from 'react-redux';

import {
  searchBookmark
} from '../actions';
import BookmarkMenu from '../components/bookmark-menu.jsx';

const mapDispatchToProps = (dispatch) => ({
  onUpdateSearchBox: (text) => {
    dispatch(searchBookmark(text));
  },
});

const UpdatableBookmarkMenu = connect(null, mapDispatchToProps)(BookmarkMenu);

export default UpdatableBookmarkMenu;
