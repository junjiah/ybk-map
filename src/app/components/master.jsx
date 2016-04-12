import React from 'react';

import SelectableYelpMap from '../containers/yelp-map.jsx';
import UpdatableBookmarkList from '../containers/bookmark-list.jsx';

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
        <SelectableYelpMap />
        <UpdatableBookmarkList />
      </div>
    );
  }
}

export default Master;
