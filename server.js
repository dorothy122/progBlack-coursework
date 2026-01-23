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
        name: item.name,
        type: item.type,
        streaming: item.streaming,
        image: item.image,
        imageTitle: item.imageTitle

    }));

    // map function: https://www.w3tutorials.net/blog/nodejs-filter-map/#the-map-method

    resp.status(200).json(summary);

});


// send specific info 
app.get('/list/:title', function(req, resp) {
    const title = req.params.title

    // idk how to do this bit. find somewhere that ectually explains this line 
    const item = info.find(obj => obj.imageTitle === title)

    // ADD DISPLAY ERROR IF ERROR BIT

    
    resp.status(200).json(item)
})



// http://localhost:8090/
app.listen(8090);

