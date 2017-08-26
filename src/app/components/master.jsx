import React from 'react';

import SelectableYelpMap from '../containers/yelp-map.jsx';
import UpdatableBookmarkList from '../containers/bookmark-list.jsx';
import UpdatableBookmarkMenu from '../containers/bookmark-menu.jsx';

class Master extends React.Component {

  getStyles() {
    return Object.freeze({
      root: {
        minHeight: '100vh'
      }
    });
  }

  render() {
    return (
      <div>
        <UpdatableBookmarkMenu />
        <SelectableYelpMap />
        <UpdatableBookmarkList />
      </div>
    );
  }
}

export default Master;
