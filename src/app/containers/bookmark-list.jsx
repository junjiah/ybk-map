import { connect } from 'react-redux';

import {
  selectBookmark,
  editBookmarkNote
} from '../actions';
import BookmarkList from '../components/bookmark-list.jsx';

const mapStateToProps = (state) => ({
  bookmarks: state.bookmarks.map(b => ({
    id: b.id,
    name: b.name,
    categories: b.categories,
    rating: b.rating,
    url: b.url,
    note: b.note,
  })),
  selectedBookmark: state.selected,
});

const mapDispatchToProps = (dispatch) => ({
  onCardClick: (id) => {
    dispatch(selectBookmark(id))
  },
  onNoteSaved: (id, note) => {
    dispatch(editBookmarkNote(id, note))
  }
});

const UpdatableBookmarkList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkList);

export default UpdatableBookmarkList;
