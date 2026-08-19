var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  var file = req.url.replace(/^\//, '');
  var fileNames = file.split('.');
  var extension = fileNames.length > 1 ? fileNames[fileNames.length - 1] : 'html';
  var mimeType = getMIMEType(extension);

  file = (file === '' || !['tracker', 'admin', 'loan', 'lend', 'tracker.js', 'manifest.json', 'images/logo.png', 'serviceworker.js', 'analytics'].includes(file)) ? 'tracker' : file;
  file = (file === 'tracker' || file === 'admin' || file === 'analytics' || file === 'loan' || file === 'lend') ? file + '.html' : file;

  fs.readFile(file, function (err, data) {
    console.log(file);

    if (err) {
      console.error('Error reading file:', file, err);
      res.writeHead(err.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end(err.code === 'ENOENT' ? 'Not Found' : 'Internal Server Error');
    }

    res.writeHead(200, { 'Content-Type': mimeType });
    return res.end(data);
  });
}).listen(process.env.PORT || 4200);

function getMIMEType(type) {
  var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript',
    json: 'application/json'
  };
  return mime[type] || mime.html;
}
