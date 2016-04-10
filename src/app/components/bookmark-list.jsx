import React from 'react';

import BookmarkItem from './bookmark-item.jsx';

class BookmarkList extends React.Component {

  getStyles() {
    return Object.freeze({
      container: {
        top: 0,
        right: 0,
        width: '500px',
        height: '100%',
        position: 'absolute',
        margin: '8px 0 0 8px',
        overflowY: 'scroll',
      },
    });
  }

  render() {
    const styles = this.getStyles();
    const bookmarks = this.props.bookmarks;
    return (
      <div style={styles.container}>
          { bookmarks.map((b, i) => <BookmarkItem {...b} key={i} />) }
      </div>
    );
  }
}

BookmarkList.propTypes = {
  bookmarks: React.PropTypes.array.isRequired
}

export default BookmarkList;
