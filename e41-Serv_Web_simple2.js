var http = require('http');
var fs   = require('fs');
http.createServer(function(request, response) {

    fs.readFile('.' + request.url, function(err, data) {
        if (err) { data = '<html><body>Error</body></html>' };

        response.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        }); 
        
        response.end(data);

    });
}).listen(3000);
