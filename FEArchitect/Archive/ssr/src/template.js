export default function template(title, initialState = {}, content = '') {
  const scripts = `
    <script>
      window.__STATE__=${JSON.stringify(initialState)}
    </script>
    <script src="client.js"></script>
  `;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${content}</div>
        ${scripts}
      </body>
    </html>
  `;
}
