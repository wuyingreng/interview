const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
});
const App = require('./src/App').default;

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  const appString = ReactDOMServer.renderToString(<App />);
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR Example</title>
      </head>
      <body>
        <div id="root">${appString}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;
  res.send(html);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});