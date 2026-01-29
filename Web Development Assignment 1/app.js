
const express = require('express');
const app = express();

const fs = require('fs');


// using the client folder
app.use(express.static('client'));
// allows server to recieve json from client 
app.use(express.json())


// load the info about the movies and tv programs  
const info = require('./items.json');
// load genre info
const genres = require("./genres.json")



// send info to script.js
app.get('/list', function(req, resp) {
    
    // filter info to send
    const summary = info.map( item => ({
        name: item.name,
        type: item.type,
        streaming: item.streaming,
        image: item.image,
        imageTitle: item.imageTitle,
        genre: item.genre

    }));
    // map function use: https://www.w3tutorials.net/blog/nodejs-filter-map/#the-map-method

    resp.status(200).json(summary);

});


// send genres to script.js
app.get('/genres', function(req, resp) {
    
    resp.status(200).json(genres);

});



// send specific info 
app.get('/list/:title', function(req, resp) {
    const title = req.params.title

    const item = info.find(obj => obj.imageTitle === title)

    if (item != undefined) {
        resp.status(200).json(item)
    }
    else {
        resp.status(400).send("No content for this item")
    }
})





app.post("/list/add", function(req, resp) {
    // check not a duplicate
    const duplicate = info.find(item => item.name == req.body.name)

    if (!duplicate) {
        // add to info
        info.push(req.body)

        // add to json file
        fs.writeFileSync("./items.json", JSON.stringify(info, null, 2))

        // send message back to say its been added
        resp.send("Thank you, your item has been added to the page")
    }
    else {
        // msg to tell user its a duplicate
        resp.status(400).send("Item with this title already exists")

    }
})

// connect to server.js
module.exports = app;