import { connect } from 'react-redux';

import api from '../api.js';
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
    context: b.context,
    review: b.review,
    mark: b.mark,
  })),
  selectedBookmark: state.selected,
});

const mapDispatchToProps = (dispatch) => ({
  onCardClick: (id) => {
    dispatch(selectBookmark(id))
  },
  onSaved: (id, contentType, content) => {
    api.editNote({id, contentType, content},
      // Done.
      () => { dispatch(editBookmarkNote(id, contentType, content)) },
      // Fail.
      () => { alert(`Failed to save ${contentType} for ${id}`) });
  }
});

const UpdatableBookmarkList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkList);

export default UpdatableBookmarkList;
