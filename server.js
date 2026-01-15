const express = require('express');
const app = express();

// using the client folder
app.use(express.static('client'));


// load the info about the movies and tv programs  
const info = require('./info.json');


// send info to script.js
app.get('/list', function(req, resp) {
    resp.send(info);

});



// http://localhost:8090/list
app.listen(8090);

