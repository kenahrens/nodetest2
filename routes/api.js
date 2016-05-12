var express = require('express');
var newrelic = require('newrelic');
var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'api response' });
});

// Get a list of all the users
router.get('/users', function(req, res) {

  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('usercollection');

  collection.find({},{},function(e,docs){
        
    // Add the user list count as custom metric
    newrelic.recordMetric('Custom/User Count', docs.length);
    console.log('User Count is ' + docs.length);
    res.json(docs);
  });
});

// Get a specific user
router.get('/user/:id', function(req, res) {
  var id = req.params.id;
  var db = req.db;
  var collection = db.get('usercollection');
  var search = { "_id": id};
  collection.find(search, {}, function(e, docs) {
    res.json(docs);
  });
});

// Add a specific new user, return created id
router.post('/user', function(req, res) {

  // Set our internal DB variable
  var db = req.db;
  var collection = db.get('usercollection');

  // Grab the user info from request
  var userInfo = {
    'fname': req.body.fname,
    'lname': req.body.lname,
    'username': req.body.username,
    'email': req.body.useremail,
    'addstreet': req.body.addstreet,
    'addcity': req.body.addcity,
    'addstate': req.body.addstate,
    'addzip': req.body.addzip
  }
});

router.delete('/user/:id', function(req, res) {

});


module.exports = router;