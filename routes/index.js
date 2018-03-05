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
    
    if (Math.random() > 0.5) {
      throw('catastrophic error is happening in the system');
    } else {
      res.render('helloworld', { title: 'Caught Error Page' } );
    }

  } catch (e) {
    newrelic.noticeError(e);
    res.render('error', e);
  }
});

module.exports = router;
