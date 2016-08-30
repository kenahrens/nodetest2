const request = require('request');
const config = require('config');

// Global variables
var webHost = config.get('loadConfig.webHost');
var webPort = ':' + config.get('loadConfig.webPort')
var requestCount = 0;
var responseCount = 0;
var delayRate = 1000; // Default delay rate is 10s

// Get a specific endpoint (with some randomness)
var getWeb = function(endpoint) {
  var uri = 'http://' + webHost + webPort + endpoint;

  // Don't always issue the request, some randomness
  if (Math.random() < getLoadLevel()) {
    request.get(uri)
      .on('response', function(response) {
        responseCount++;
        if (response.statusCode != 200) {
          console.log('*** Error *** ' + response.statusCode);
          console.log(response.body);
        }
      })
    requestCount++;
  }

  if ((requestCount % 100) == 0) {
    console.log('Got responses to ' + responseCount + ' of ' + requestCount + ' requests');
  }
}

// Add a User
var addUser = function() {
  const faker = require('faker');

  // Keep the username, we run search after the user is added
  var username = faker.internet.userName();

  var uri = 'http://' + webHost + webPort + '/user/add';
  var form = { form: {
    'fname': faker.name.firstName(),
    'lname': faker.name.lastName(),
    'username': username,
    'useremail': faker.internet.email(),
    'addstreet': faker.address.streetAddress(),
    'addcity': faker.address.city(),
    'addstate': faker.address.stateAbbr(),
    'addzip': faker.address.zipCode()
  }};

  // Don't always issue the request, some randomness
  if (Math.random()  < getLoadLevel()) {
    request.post(uri, form)
      .on('response', function(response) {
        responseCount++;
        if (response.statusCode != 302) {
          console.log('*** Add User Error *** ' + response.statusCode);
          console.log(response.body);
        } else {
          search(username);
        }
    });
    requestCount++;
  }
}

// Run the Search
var search = function(username) {
  var uri = 'http://' + webHost + webPort + '/user/runsearch';
  var form = { form: {
    'searchterm': username
  }};

  // Don't always issue the request, some randomness
  if (Math.random()  < getLoadLevel()) {

    request.post(uri, form)
      .on('response', function(response) {
        responseCount++;
        if (response.statusCode != 200) {
          console.log('*** Search Error ***' + response.statusCode);
          console.log(response.body);
        }
      });
    requestCount++;
  }
}

var loop = function() {
  
  // Add User sometimes calls search right after
  addUser();

  // These are generic get requests
  getWeb('/');
  getWeb('/user/new');
  getWeb('/user/list');
  getWeb('/user/search');

  // var delay = Math.random() * delayRate;
  setTimeout(loop, delayRate);
}

// This helper function determines the load level
// The load level is used for randomness
var getLoadLevel = function() {
  var minute = new Date().getMinutes();
  var loadLevel = (minute + 40) / 100;
  return loadLevel;
}

function testStart() {
  console.log('testStart: Running web tests against: ' + webHost);
  loop();
}

function testInit() {
  if (process.env.LOAD_DELAY != null) {
    delayRate = process.env.LOAD_DELAY;
  }
  console.log('testInit: Delay rate is: ' + delayRate);
  setTimeout(testStart, delayRate);
}

testInit();