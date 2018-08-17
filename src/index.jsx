import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store';

import './index.less';

const history = createBrowserHistory();

const Root = () => (
  <Provider store={store}>
    <App history={history} />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
