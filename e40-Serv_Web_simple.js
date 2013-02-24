var HTTP = require('http');    // importar biblioteca HTTP
var FS   = require('fs');      // importar biblioteca de acceso a ficheros

var server = HTTP.createServer(   // crea servidor HTTP
  function(request, response) {   // Callback: solicitudes de cliente
    FS.readFile(
      ('public' + request.url),   // Calcula path: public/path_del_URL
      function(err, data) {       // Callback: final de lectura de fichero
        if (!err) {
          response.writeHead(                 // Envío cabecera HTTP
            200, 
            { 'Content-Type': 'text/html',    // Tipo de contenido
              'Content-Length': data.length   // Longitud de contenido
            }
          ); 
          response.end(data);         // Envío cuerpo(payload): Página HTML
        }
        else { response.end('error'); }; // HTTP simplificado (incorrecto)
      }
    );
  }
)
server.listen(3000);     // arranca servidor en puerto 3000