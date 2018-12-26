import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore } from './store';

import './index.less';

const store = createStore();

const history = createBrowserHistory();

ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
