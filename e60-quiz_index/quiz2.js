var HTTP = require('http');  // Librería HTTP
var URL  = require('url');   // Librería con parser de URLs
var FS   = require('fs');    // Librería de acceso a ficheros

HTTP.createServer(function(request, response) {

  var MODEL = {
    find: function (question, action) { // Buscar pregunta en bbdd.txt
      FS.readFile('bbdd.txt', 'utf-8', function(err, bbdd) {
        action(err, bbdd.match(new RegExp('^'+question+': .*$','m')));
      });
    }
  }


  var VIEW = {
    render: function (file, r1) { // envía vista renderizada a cliente
      FS.readFile(file, 'utf-8', function(err, data) {
        if (!err) {
          var data = data.replace(/<%r1%>/, r1);
          response.writeHead(200, {             // Envía cabecera
            'Content-Type': 'text/html', 
            'Content-Length': data.length 
          }); 
          response.end(data);                   // Envía datos       
        } else { VIEW.error(500, "Server operation Error"); };
      });
    },
                 // envia error a cliente
    error: function(code,msg) { response.writeHead(code); response.end(msg);}
  }  


  var controller = {
    index: function() { view.render ('index.html', ""); },

    show: function () { // render se ejecuta en callback cuando find acaba
      model.find(question, function(err, answer) {
        if (!err) view.render('show.html',(answer||["Sin respuesta"])[0]);
        else      view.error(500, "Server bbdd Error");
      });
    }
  }


  var url      = URL.parse(request.url, true); // parsea el url enviado
  var route    = request.method + ' ' + url.pathname;  // crea ruta
  var question = url.query.preg; // Extrae pregunta de query, si existe

  switch (route) {            // Analiza ruta e invoica controlador
    case 'GET /quiz/index'   : CONTROLLER.index() ; break;
    case 'GET /quiz/show'    : CONTROLLER.show()  ; break;
    default: VIEW.error(400, "Unsupported request");
  }
}).listen(3000);