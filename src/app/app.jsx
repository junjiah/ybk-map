import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';

import AppRoutes from './app-routes.jsx';

import '../less/main.less';

const injectTapEventPlugin = require('react-tap-event-plugin');

// Needed for React Developer Tools
window.React = React;

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

ReactDOM.render(
  <Router history={hashHistory}>
    {AppRoutes}
  </Router>,
  document.getElementById('app')
);
