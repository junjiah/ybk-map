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
  onSaved: (id, updated) => {
    // Map to request promises.
    const promises = Object.keys(updated).map(contentType => {
      const content = updated[contentType];
      return api.editNote({id, contentType, content});
    });
    Promise.all(promises).then(
      // Success.
      () => { dispatch(editBookmarkNote(id, updated)) },
      // Fail.
      () => { alert(`Failed to save content for bookmark ${id}`) }
    );
  }
});

const UpdatableBookmarkList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkList);

export default UpdatableBookmarkList;
