const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const requested = req.url === '/' || req.url === '' ? '/tracker.html' : req.url;
  const cleanPath = decodeURIComponent(requested.split('?')[0]);
  const safePath = path.normalize(cleanPath).replace(/^([.][.][/\\])+/, '');
  const filePath = path.join(process.cwd(), safePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentTypes = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.txt': 'text/plain; charset=utf-8'
    };

    res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream');
    res.statusCode = 200;
    res.end(data);
  });
};
