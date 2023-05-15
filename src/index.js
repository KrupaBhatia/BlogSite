const express = require('express');
const bodyParser = require('body-parser');//to gets data in json format
const route = require('./router/router.js');
const mongoose  = require('mongoose');
const app = express();

const cors = require("cors");



app.use(cors());

app.use(bodyParser.json());



mongoose.connect("mongodb+srv://krupabhati0521:7mRBZ5np6Ct1sM2P@blog.pvqfvcc.mongodb.net/Krupa", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route); 


app.listen(process.env.PORT || 8080, function () {
    console.log('Express app running on port ' + (process.env.PORT || 8080))
});

