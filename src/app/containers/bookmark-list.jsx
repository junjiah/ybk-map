import {connect} from 'react-redux';

import api from '../api.js';
import {Visibility} from '../util';
import {
  selectBookmark,
  editBookmarkNote
} from '../actions';
import BookmarkList from '../components/bookmark-list.jsx';

const mapStateToProps = (state) => {
  return {
    bookmarks: state.bookmarks.filter(b => b.visible === Visibility.VISIBLE),
    selectedBookmark: state.selected
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCardClick: (id) => {
    dispatch(selectBookmark(id));
  },
  onSaved: (id, updated) => {
    // Map to request promises.
    const promises = Object.keys(updated).map(contentType => {
      const content = updated[contentType];
      return api.editNote({id, contentType, content});
    });
    Promise.all(promises).then(
      () => dispatch(editBookmarkNote(id, updated)),
      // eslint-disable-next-line no-alert
      () => alert(`Failed to save content for bookmark ${id}`)
    );
  }
});

const UpdatableBookmarkList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkList);

export default UpdatableBookmarkList;
