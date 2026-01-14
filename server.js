const express = require('express');
const app = express();

app.use(express.static('client'));

// load the info about the movies and tv programs  
// const info = require('./info.json');

let info = [ 'little women', 'motherland', 'people we meet on vacation'];

app.get('/list', function(req, resp) {
    resp.send(info);

});

// http://localhost:8090
app.listen(8090);