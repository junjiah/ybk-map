import { combineReducers } from 'redux'

import { bookmarks, selected } from './bookmarks.jsx';

const YBK = combineReducers({
  bookmarks,
  selected,
});

export default YBK;
