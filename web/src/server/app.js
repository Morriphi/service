'use strict';

var path = require('path');
var http = require('http');
var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views/'));

app.get('/', function (req, res) {
  http.get('http://api/', function(response){

    response.on('data', function(chunk) {
  	res.render('main', { pageTitle: 'App', heading: chunk});
    });
   });
});

module.exports = app;
