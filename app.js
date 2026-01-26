const express = require('express');
const app = express();

const fs = require('fs');


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

    const item = info.find(obj => obj.imageTitle === title)

    resp.status(200).json(item)
})


app.post("/list/add", function(req, resp) {
    // check not a duplicate
    const duplicate = info.find(item => item.name == req.body.name)

    if (!duplicate) {
        // add to info
        info.push(req.body)

        // add to json file
        fs.writeFileSync("./info.json", JSON.stringify(info, null, 2))

        // send message back to say its been added
        resp.send("Thank you, your item has been added to the page")
    }
    else {
        resp.status(400).send("Item with this title already exists")

    }
})



module.exports = app;