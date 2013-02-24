  .....
  var VIEW = {
    render: function (file, r1) {
      FS.readFile('app.html', 'utf-8', function(err, app) {// leer marco: app.html
        if (!err) {
          FS.readFile(file, 'utf-8', function(err, view) { // leer vista
            if (!err) {
              var data = app.replace(/<%view%>/, view); // integrar marco y vista
              data = data.replace(/<%r1%>/, r1);    // integrar parámetro <%r1%>
              response.writeHead(200, {
                'Content-Type': 'text/html', 
                'Content-Length': data.length 
              }); 
              response.end(data);
            } else { VIEW.error(500, "Server operation Error_r1"); };
          });
        } else { VIEW.error(500, "Server operation Error_r2"); };
      });
    },
    .....  
  }
  .....