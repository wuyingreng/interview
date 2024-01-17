const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  if (parsedUrl.pathname === '/payloadXSS.html') {
    const filePath = path.join(__dirname, 'payloadXSS.html');
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading payloadXSS.html');
      } else {
        // 在这里使用query对象中的参数进行处理
        const dynamicContent = `<h1>Hello, ${query.name || 'Anonymous'}!</h1>`;
        const modifiedContent = content.replace('{{dynamicContent}}', dynamicContent);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(modifiedContent);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(8000, () => {
  console.log('Server running at http://localhost:8000/');
});
