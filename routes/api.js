var express = require('express');
var newrelic = require('newrelic');
var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'api response' });
});


module.exports = router;