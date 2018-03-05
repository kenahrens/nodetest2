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

    // Create the error
    var evalError = new EvalError(errMsg);
    evalError.status = 501;

    // Capture the error in NR
    newrelic.noticeError(evalError);

    // Set the response code
    res.status(evalError.status);

    // Send the response
    var rsp = {
      message: errMsg,
      error: evalError
    }
    res.render('error', rsp);
  }
});

module.exports = router;
