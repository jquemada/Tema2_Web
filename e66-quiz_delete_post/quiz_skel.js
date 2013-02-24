  .......
  var MODEL = {
    .......
    delete: function (question, action) {
      FS.readFile('bbdd.txt','utf-8', function(err, bbdd) {
        if (!err) {
          bbdd = bbdd.replace(new RegExp(question + ':.*\n', 'g'), '');
          FS.writeFile('bbdd.txt', bbdd, 'utf-8', function (err) {
            action(err);
          });
        } else { action(err); };
      });
    }
  }

  var VIEW = { .... }

  var CONTROLLER = {
    ...........
    remove: function() {
      MODEL.all_questions (function(err, all_questions) {
        if (!err) VIEW.render('remove.html', all_questions);
        else      VIEW.error(500, "Server bbdd Error_d");
      });
    },

    delete: function () {
      MODEL.delete (question, function(err) {
        if (!err) CONTROLLER.index();  // redirección a 'GET quiz/index'
        else      VIEW.error(500, "Server bbdd Error_e");
      });
    }
  }
  .........