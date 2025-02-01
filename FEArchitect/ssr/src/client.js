import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './components/App';

const initialState = window.__STATE__;
const store = configureStore(initialState);

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
