........
HTTP.createServer(function(request, response) {
  ....
  var MODEL = {
  ......
    create: function (question, action) {
      FS.appendFile('bbdd.txt', question+'\n', 'utf-8', function(err){
        action(err);
      });
    }
  }

  var VIEW = { .... }

  var CONTROLLER = {
    ......
    new: function () { VIEW.render ('new.html', ""); },

    create: function () {
      MODEL.create(question, function(err) {
        if (!err) CONTROLLER.index();  // redirección a 'GET quiz/index'
        else      VIEW.error(500, "Server bbdd Error_c");
      });
    }
  }
  
.......
}).listen(3000);