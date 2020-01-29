var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var Web3 = require('web3');

var port = 8000;
var public_dir = path.join(__dirname, 'public');

var app = express();
app.use(express.static(public_dir));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/favicon.ico', (req, res) => res.status(204));

console.log('Now listening on port ' + port);
var server = app.listen(port);
