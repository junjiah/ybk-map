import { connect } from 'react-redux';

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

const UpdatableBookmarkList = connect(
  mapStateToProps
)(BookmarkList);

export default UpdatableBookmarkList;
