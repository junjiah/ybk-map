import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import api from './api.js';
import {Visibility} from './util';
import {initBookmarks} from './actions';

import Master from './components/master.jsx';
import YBK from './reducers';

import '../less/main.less';

// Needed for React Developer Tools.
window.React = React;

// Needed for onTouchTap.
// https://github.com/zilverline/react-tap-event-plugin
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const store = createStore(YBK);

// Fetch init bookmarks!
Promise
  .all([api.getBookmarks(), api.getNotes()])
  .then(
    // Success.
    results => {
      const bookmarks = results[0];
      const notes = results[1];
      // A map keyed on bookmark ID.
      const bookmarkMap = new Map();
      for (const b of bookmarks) {
        bookmarkMap.set(b.id, b);
        // Add another field to indicate display or not.
        b.visible = Visibility.VISIBLE;
      }
      for (const note of notes) {
        const id = note.bookmark_id;
        const b = bookmarkMap.get(id);
        if (b) {
          Object.assign(b, {
            context: note.context,
            review: note.review,
            mark: note.mark
          });
        }
      }
      const bookmarkList = Array.from(bookmarkMap.values());
      store.dispatch(initBookmarks(bookmarkList));
    },
    // eslint-disable-next-line no-alert
    () => alert('Failed to fetch bookmarks/notes!')
  );

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Master />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
