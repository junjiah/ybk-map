import {combineReducers} from 'redux';

import {bookmarks, selected} from './bookmarks.jsx';
import {mapViewport} from './map.jsx';

const YBK = combineReducers({
  bookmarks,
  selected,
  mapViewport
});

export default YBK;
