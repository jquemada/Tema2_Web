var HTTP = require('http');  // Librería HTTP
var URL  = require('url');   // Librería con parser de URLs
var FS   = require('fs');    // Librería de acceso a ficheros

HTTP.createServer(function(request, response) {

  var MODEL = {
    find: function (question, action) { ... accede a bbd.txt ... });
    }
  }

  var VIEW = { 
    render: function (file, r1) { .... }, //envía vista a cliente
    error: function (code,msg) { .... }   //envía error a cliente
  }  

  var CONTROLLER = {
    index: function() { .. VIEW.render 'index.html' .. },
    show: function(){ .. MODEL.find(question, ..) .. VIEW.render 'show.html'}
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