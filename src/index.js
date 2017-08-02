import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import App from './containers/App';
import './styles/reset.css';
import configureStore from './store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(createBrowserHistory(), store);
render(
  <Provider store={store}>
    <BrowserRouter history={history} >
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
