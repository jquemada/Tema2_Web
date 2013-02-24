  ..........
  var url       = URL.parse(request.url, true); // parsea query de url (show)
  var post_data = "";
  request.on('data', function (chunk) { post_data += chunk; });
  request.on('end', function() { //body de POST llega con eventos 'data' y 'end'

    post_data = QS.parse(post_data); //parsea query en body-POST (create, delete)

    // "question" variable global -> visible en controlador
    question  = (post_data.preg || url.query.preg);  // query de url o de body
    var route = request.method + ' ' + url.pathname;

    switch (route) {
      case 'GET /quiz/index'     : CONTROLLER.index()   ; break;
      case 'GET /quiz/show'      : CONTROLLER.show()    ; break;
      case 'GET /quiz/new'       : CONTROLLER.new()     ; break;
      case 'POST /quiz/create'   : CONTROLLER.create()  ; break;
      case 'GET /quiz/remove'    : CONTROLLER.remove()  ; break;
      case 'POST /quiz/delete'   : CONTROLLER.delete()  ; break;
      default: {
        if (request.method == 'GET') CONTROLLER.file() ;
        else VIEW.error(400, "Unsupported request");
      }
    }
  });
  .........