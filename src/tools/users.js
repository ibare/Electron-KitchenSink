var debug   = require('debug')('server:users');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res, next) {
  res.send({ status: 'ok'});
});

router.get('/:id', function(req, res, next) {
  res.send({ id: req.params.id });
});

module.exports = router;
