import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './components/App';
import template from './template';

const server = express();

server.use(express.static('assets')); // Serve static files

server.get('/', (req, res) => {
  const store = configureStore(); // Create a new store
  const content = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const preloadedState = store.getState(); // Get the state

  res.send(template('SSR Example', preloadedState, content)); // Send the HTML
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
