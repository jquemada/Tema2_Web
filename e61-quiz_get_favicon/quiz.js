var HTTP = require('http');
var URL  = require('url');
var FS   = require('fs');
var MIME = require('mime');

HTTP.createServer(function(request, response) {

  var MODEL = {
    find: function (question, action) { // Buscar pregunta en bbdd.txt
      FS.readFile('bbdd.txt', 'utf-8', function(err, bbdd) {
        action(err, bbdd.match(new RegExp('^'+question+': .*$','m')));
      });
    }
  }


  var VIEW = {
    render: function (file, r1) {
      FS.readFile(file, 'utf-8', function(err, data) {
        if (!err) {
          var data = data.replace(/<%r1%>/, r1);
          response.writeHead(200, {
            'Content-Type': 'text/html', 
            'Content-Length': data.length 
          }); 
          response.end(data);
        } else { VIEW.error(500, "Server operation Error"); };
      });
    },

    error: function(code,msg) { response.writeHead(code); response.end(msg);},

    file: function(file) {
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
    index: function() { VIEW.render ('index.html', ""); },

    show: function () { 
      MODEL.find(question, function(err, resp) {
        if (!err) VIEW.render('show.html',(resp||["Sin respuesta"])[0]);
        else      VIEW.error(500, "Server bbdd Error");
      });
    },

    file: function() { VIEW.file(url.pathname.slice(1)); }
  }


  var url      = URL.parse(request.url, true);
  var route    = request.method + ' ' + url.pathname;
  var question = url.query.preg;

  switch (route) {
    case 'GET /quiz/index'   : CONTROLLER.index()   ; break;
    case 'GET /quiz/show'    : CONTROLLER.show()    ; break;
    default: {
      if (request.method == 'GET') CONTROLLER.file() ;
      else VIEW.error(400, "Unsupported request");
    }
  }
}).listen(3000);