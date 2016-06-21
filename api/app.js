var express = require('express');
var app = express();

var redis = require("redis"),
  client = redis.createClient({host: 'redis'});

client.set('hits', 0);

var amqp = require('amqp');
var connection = amqp.createConnection({host: 'rabbit'});

var messages = [];

var queue;
connection.on('ready', function () {
// Use the default 'amq.topic' exchange
  connection.queue('my-queue', function (q) {
    q.bind('#');
    queue = q;
    //q.subscribe(function (message, headers, deliveryInfo, messageObject) {
    //  messages.push(messageObject);
    //  console.log(message);
    //});
  });
});

app.get('/', function (req, res) {
    client.incr('hits');
    client.get('hits', function(err, value) {
      res.send(`Api called ${value} times`);
    });
});

app.get('/next', function(req, res){
  res.send(queue.shift());
});

module.exports = app;
