.......
HTTP.createServer(function(request, response) {

  var MODEL = {
    ..........
    all_questions: function (action) { // busca list de preguntas en bbdd.tex
      FS.readFile('bbdd.txt', 'utf-8', function(err, bbdd) {
        action(err, bbdd.replace(/^(.*): .*$/mg, '<option>$1</option>'));
      });
    }
  }
  var VIEW = { .... }
  var CONTROLLER = {
    index: function () { // inserta lista de preguntas en select de vista
      MODEL.all_questions (function(err, all_questions) {
        if (!err) VIEW.render('index.html', all_questions);
        else      VIEW.error(500, "Server bbdd Error");
      });
    },
    ..........
  }
  ...... 
}).listen(3000);