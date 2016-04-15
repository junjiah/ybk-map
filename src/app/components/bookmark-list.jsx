import React, { PropTypes } from 'react';

import BookmarkItem from './bookmark-item.jsx';

class BookmarkList extends React.Component {

  getStyles() {
    return {
      container: {
        top: 0,
        right: 0,
        width: '500px',
        height: '100%',
        position: 'absolute',
        margin: '8px 0 0 8px',
        overflowY: 'scroll',
        paddingLeft: '20px',
      },
    };
  }

  render() {
    const styles = this.getStyles();
    const bookmarks = this.props.bookmarks;
    return (
      <div style={styles.container}>
          { bookmarks.map((b, i) =>
            <BookmarkItem
              {...b}
              selected={b.id === this.props.selectedBookmark}
              onClick={() => this.props.onCardClick(b.id)}
              onNoteSaved={this.props.onNoteSaved}
              key={i} />) }
      </div>
    );
  }
}

BookmarkList.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,  // [string].
    rating: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  selectedBookmark: PropTypes.string,
  onCardClick: PropTypes.func.isRequired,
  onNoteSaved: PropTypes.func.isRequired,
};

export default BookmarkList;
