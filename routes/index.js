var express = require('express');
var newrelic = require('newrelic');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.headers);
  res.render('index', { title: 'Node Test v2' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

router.get('/error', function(req, res) {
  var error = 'whoops this is an uncaught error!';
  throw(error);
});

router.get('/caught', function(req, res) {
  try {
    throw('catastrophic error is happening in the system');
  } catch (errMsg) {

    var err = new Error(errMsg);
    err.status = 501;

    newrelic.noticeError(err);
    var rsp = {
      message: errMsg,
      error: err
    }
    res.status(err.status);
    res.render('error', rsp);
  }
});

module.exports = router;
