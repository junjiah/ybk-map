import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import api from './api.js';
import { initBookmarks } from './actions';
import AppRoutes from './app-routes.jsx';
import YBK from './reducers';

import '../less/main.less';

const injectTapEventPlugin = require('react-tap-event-plugin');

// Needed for React Developer Tools
window.React = React;

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

let store = createStore(YBK);

// Fetch init bookmarks!
api.getBookmarks(bookmarks => {
  api.getNotes(notes => {
    // A map keyed on bookmark ID.
    let bookmarkMap = new Map();
    for (let b of bookmarks) {
      bookmarkMap.set(b.id, Object.assign({}, b, {
        note: '',  // TODO: compatibility.
      }));
    }
    for (let note of notes) {
      const id = note['bookmark_id'];
      let b = bookmarkMap.get(id);
      if (b) {
        Object.assign(b, {
          context: note.context,
          review: note.review,
          mark: note.mark,
        });
      }
    }
    const bookmarkList = Array.from(bookmarkMap.values());
    store.dispatch(initBookmarks(bookmarkList));
  }, () => alert('Failed to fetch notes!'))
}, () => alert('Failed to fetch bookmarks!'));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {AppRoutes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
