'use strict';

var express = require('express');
var server = express();

server.configure(function(){
  server.use('/components',
             express.static(__dirname + '/../app/bower_components/'));
  server.use('/templates',
             express.static(__dirname + '/../.tmp/scripts/'));
  server.use('/scripts', express.static(__dirname + '/../app/scripts/'));
  server.use(express.static(__dirname + '/'));
});

server.listen(3000);
console.log('Listening on port 3000 ...');