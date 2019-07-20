var express = require('express');
var newrelic = require('newrelic');
var router = express.Router();
var request = require('request');
var config = require('config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/list');
});

/* GET user search */
router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Search for User' });
})

/* GET Userlist page. */
router.get('/list', function(req, res) {

  // Call the API
  var uri = config.get('apiConfig.user') + 'users/';
  request.get(uri, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('Received GET response from /api/users/', body.length);
      res.render('userlist', {'users': JSON.parse(body)});
    } else {
      // Send the error response
      var rsp = {
        message: 'API Error',
        error: error
      }
      res.render('error', rsp);
    }
  });
});

/* GET New User page. */
router.get('/new', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});

/* GET Specific User page. */
router.get('/:id', function(req, res) {
  var id = req.params.id;
  console.log('WEB - get user profile: ' + id);

  // Call the API
  var uri = config.get('apiConfig.user') + 'user/' + id;
  request.get(uri, function(error, response, body) {
    console.log('Received GET response from /api/user/' + id, body.length);
    if (!error && response.statusCode === 200) {
      res.render('userprofile', {'userlist': JSON.parse(body)});
    } else {
      // Send the error response
      var rsp = {
        message: 'API Error',
        error: error
      }
      res.render('error', rsp);
    }
  });
});

/* POST to Add User Service */
router.post('/add', function(req, res) {

    // Submit to the API
    var userInfo = {
        'fname': req.body.fname,
        'lname': req.body.lname,
        'username': req.body.username,
        'useremail': req.body.useremail,
        'addstreet': req.body.addstreet,
        'addcity': req.body.addcity,
        'addstate': req.body.addstate,
        'addzip': req.body.addzip
    }

    // POST Options
    var uri = config.get('apiConfig.user') + 'user/';
    var options = {
      'method': 'POST',
      'uri': uri,
      'json': true,
      'body': userInfo
    }

    // Call the API
    request(options, function(error, response, body) {
      console.log('Received POST response from /api/user/', body);
      if (!error && response.statusCode === 200) {
        var id = response.body._id;
        console.log('We are about to redirect to ' + id);
        res.redirect(id);
      } else {
        // Send the error response
        var rsp = {
          message: 'API Error',
          error: error
        }
        res.render('error', rsp);
      }
    });
});

/* POST to search form */
router.post('/runsearch', function(req, res) {

  // POST Options
  console.log('Searching for', req.body.searchterm);
  var uri = config.get('apiConfig.user') + 'search/';
  var reqBody = {
    'searchterm': req.body.searchterm
  }
  var options = {
    'method': 'POST',
    'uri': uri,
    'json': true,
    'body': reqBody
  }

  // Call the API
  request(options, function(error, response, body) {
    console.log('Received POST response from /api/search/', body);
    if (!error && response.statusCode === 200) {
      console.log('Response from ')
      res.render('userlist', {'users': body});
    } else {
      // Send the error response
      var rsp = {
        message: 'API Error',
        error: error
      }
      res.render('error', rsp);
    }
  });
});

module.exports = router;
