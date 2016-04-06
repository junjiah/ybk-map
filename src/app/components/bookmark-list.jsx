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
    return (
      <div style={styles.container}>
          { Array
            .from(Array(10).keys())
            .map((i) => <BookmarkItem />)
          }
      </div>
    );
  }
}

export default BookmarkList;
