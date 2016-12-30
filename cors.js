var express = require('express'),
    port = 4000,
    app = express();

app.use(express.static(__dirname + '/dist'));


  app.listen(port, function(){
    console.log('Express app listening on port ' + port + '.');

})
