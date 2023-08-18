const express = require('express');
const app = express();
require('dotenv').config(); 
app.use(express.json());

app.listen(process.env.CONNECTION_PORT , function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", process.env.CONNECTION_PORT );
});

const path = require('path');
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/transaction', function(req, res){
    res.sendFile(path.join(__dirname+'/transaction.html'));
});
