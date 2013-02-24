var HTTP = require('http');
var FS   = require('fs');
var UTIL = require('util');     // import "util" library with pump() method
HTTP.createServer(function(req, resp) {
    if (req.method != 'GET') {                    // if not GET: Error 405
        resp.writeHead(405, {'Allow': 'GET'});
        resp.end();
        return;
    }                                    // insert "index.html" if no file name
    if (req.url.match(/\/$/)) req.url += '/index.html';
    var filepath = __dirname + '/public' + req.url;   // Add "public" directory
    FS.exists(filepath, function(exists) {
        if (exists) {                            // file exists: 200 OK
            var rs = fs.createReadStream(filepath);
            resp.writeHead(200);
            UTIL.pump(rs, resp, function(error) {
               if (error) {resp.end();}
            });
        } else {                               // file not found: Error 404
            resp.writeHead(404);
            resp.end();
        }
    });
}).listen(3000);