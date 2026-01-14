const express = require('express')
const app = express()

// load the info about the movies and tv programs  
const info = require('./info.json');




app.get('/info', function(req, resp) {
    resp.json(info)

})


app.listen(8090)