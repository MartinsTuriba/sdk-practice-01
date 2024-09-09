const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3001;

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath);
    const contentType = getContentType(ext) || 'text/html';

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404 Not Found');
        } else {
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('500 Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                }
            });
        }
    });
});

function getContentType(ext) {
    switch (ext) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'application/javascript';
        case '.png':
            return 'image/png';
        case '.jpg':
            return 'image/jpg';
        default:
            return 'text/html';
    }
}

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
