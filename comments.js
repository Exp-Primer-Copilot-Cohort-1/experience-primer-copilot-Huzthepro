// Create web server
// 1. Create web server
// 2. Create router
// 3. Create handler
// 4. Start server
// 5. Test in browser

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const path = url.parse(req.url).pathname;
    const method = req.method.toLowerCase();

    if (path === '/' && method === 'get') {
        fs.readFile('./index.html', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('Server error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (path === '/comment' && method === 'post') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const params = querystring.parse(body);
            fs.appendFile('./comment.txt', `${params.name} : ${params.comment}\n`, 'utf8', (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('Server error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end('Comment posted');
                }
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('Not found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});