const express = require('express');
const app = express();

// using the client folder
app.use(express.static('client'));
// allows server to recieve json from client 
app.use(express.json())


// load the info about the movies and tv programs  
const info = require('./info.json');



// send info to script.js
app.get('/list', function(req, resp) {
    // filter info

    const summary = info.map( item => ({
        type: item.type,
        streaming: item.streaming,
        image: item.image,
        imageTitle: item.imageTitle

    }));

    // map function: https://www.w3tutorials.net/blog/nodejs-filter-map/#the-map-method

    resp.send(summary);

});


// send specific info 
app.post('/list/single', function(req, resp) {
    const {title} = req.body

    // idk how to do this bit. find somewhere that ectually explains this line 
    const item = info.find(obj => obj.imageTitle === title)
    resp.send(item)
})



// http://localhost:8090/
app.listen(8090);

