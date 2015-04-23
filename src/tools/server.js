var debug   = require('debug')('server');
var echo    = console.log;
var express = require('express');
var morgan  = require('morgan');
var port    = process.env.PORT || 8080;
var app     = express();

app.use(morgan('dev'));
app.use('/users', require('./users'));

var server = app.listen(port, function() {
  echo('Listen %s - OK', server.address().port);
});
