import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './components/App';

export default (store, location = '/') =>
  renderToString((
    <Provider store={store}>
      <StaticRouter location={location} context={{}}>
        <App />
      </StaticRouter>
    </Provider>
  ));
