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
    for (let b of bookmarks) {
      b.note = notes.hasOwnProperty(b.id) ? notes[b.id] : '';
    }
    store.dispatch(initBookmarks(bookmarks));
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
