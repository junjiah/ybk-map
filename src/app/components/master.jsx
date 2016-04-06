import React from 'react';

import BookmarkList from './bookmark-list.jsx';
import YelpMap from './yelp-map.jsx';

class Master extends React.Component {

  getStyles() {
    return Object.freeze({
      root: {
        minHeight: '100vh',
      }
    });
  }

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <YelpMap />
        <BookmarkList />
      </div>
    );
  }
}

export default Master;
