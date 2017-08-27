import React from 'react';
import PropTypes from 'prop-types';

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
        paddingLeft: '20px'
      }
    };
  }

  render() {
    const styles = this.getStyles();
    const bookmarks = this.props.bookmarks;
    return (
      <div style={styles.container} className="bookmark-list">
        { bookmarks.map((b, i) =>
            (<BookmarkItem
              {...b}
              selected={b.id === this.props.selectedBookmark}
              onClick={() => this.props.onCardClick(b.id)}
              onSaved={this.props.onSaved}
              key={i} />)) }
      </div>
    );
  }
}

BookmarkList.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedBookmark: PropTypes.string,
  onCardClick: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};

export default BookmarkList;
