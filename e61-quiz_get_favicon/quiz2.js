    ...... 
var MIME = require('mime'); // determina mime-type de fichero

http.createServer(function(request, response) {
  var MODEL = { .... }
  var VIEW = {
    ......
    file: function(file) { // envia fichero con su mime-type
      FS.readFile(file, function(err, data) {
        if (!err) {
          response.writeHead(200, { 
            'Content-Type': MIME.lookup(file), 
            'Content-Length': data.length 
          }); 
          response.end(data);
        } else { VIEW.error (500, file + " not found"); };
      });
    }
  }
  var CONTROLLER = {
    ......    // Invoca vista con nombre de fichero correcto
    file: function() { VIEW.file(url.pathname.slice(1)); }
  }

  var url      = URL.parse(request.url, true);
  var route    = request.method + ' ' + url.pathname;
  var question = url.query.preg;
  switch (route) {
    case 'GET /quiz/index'   : CONTROLLER.index()   ; break;
    case 'GET /quiz/show'    : CONTROLLER.show()    ; break;
    default: { // sirve fichero si no es ningún path anterior
      if (request.method == 'GET') CONTROLLER.file() ;
      else VIEW.error(400, "Unsupported request");
    }
  }
}).listen(3000);