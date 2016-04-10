import React from 'react';

import BookmarkList from './bookmark-list.jsx';
import YelpMap from './yelp-map.jsx';

import bookmarks from '../mock-bookmarks.jsx';

/**
 * Process raw bookmarks and separate information for map and bookmark list.
 * @param  {array} bookmarks JSON list representation of bookmarks
 * @return {{ bookmarksForMap, bookmarksForList }}
 */
function extractBookmarks(bookmarks) {
 let bookmarksForMap = [], bookmarksForList = [];
 for (let b of bookmarks) {
   // (Lng, Lat) pair according to react-map-gl repo.
   bookmarksForMap.push({
     location: [b.longitude, b.latitude],
     id: b.id,
   });
   delete b.longitude;
   delete b.latitude;
   bookmarksForList.push(b);
 }
  return { bookmarksForMap, bookmarksForList };
}

class Master extends React.Component {

  componentDidMount() {
    // console.log(extractBookmarks(bookmarks));
  }

  getStyles() {
    return Object.freeze({
      root: {
        minHeight: '100vh',
      }
    });
  }

  render() {
    const styles = this.getStyles();
    const { bookmarksForMap, bookmarksForList } = extractBookmarks(bookmarks);
    return (
      <div>
        <YelpMap
          width={window.innerWidth}
          height={window.innerHeight + 10} // Hard code 10 more px for sidebar.
          bookmarks={bookmarksForMap} />
        <BookmarkList
          bookmarks={bookmarksForList} />
      </div>
    );
  }
}

export default Master;
