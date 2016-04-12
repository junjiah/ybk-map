import { connect } from 'react-redux';

import { selectBookmark } from '../actions';
import BookmarkList from '../components/bookmark-list.jsx';

const mapStateToProps = (state) => ({
  bookmarks: state.bookmarks.map(b => ({
    id: b.id,
    name: b.name,
    categories: b.categories,
    rating: b.rating,
    url: b.url,
  })),
  selectedBookmark: state.selected,
});

const mapDispatchToProps = (dispatch) => ({
  onCardClick: (id) => {
    dispatch(selectBookmark(id))
  }
});

const UpdatableBookmarkList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkList);

export default UpdatableBookmarkList;
