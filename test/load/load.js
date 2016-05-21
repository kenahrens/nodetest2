const request = require('request');
const config = require('config');

// Global variables
var webHost = config.get('loadConfig.webHost');
var webPort = ':' + config.get('loadConfig.webPort')
var requestCount = 0;
var responseCount = 0;
var delayRate = 10000; // Default delay rate is 10s

// Get a specific endpoint (with some randomness)
function getWeb(endpoint) {
  var uri = 'http://' + webHost + webPort + endpoint;

  // Don't always issue the request, some randomness
  if (Math.random() > 0.3) {
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
function addUser() {
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
  if (Math.random() > 0.2) {
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
function search(username) {
  var uri = 'http://' + webHost + webPort + '/user/runsearch';
  var form = { form: {
    'searchterm': username
  }};

  // Don't always issue the request, some randomness
  if (Math.random() > 0.5) {

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

function loop() {
  addUser();
  getWeb('/');
  getWeb('/helloworld');
  getWeb('/user/new');
  getWeb('/user/list');
  getWeb('/user/search');

  var delay = Math.random() * delayRate;
  setTimeout(loop, delay);
}

function start() {
  console.log('Running web tests against: ' + webHost);
  if (process.env.LOAD_DELAY != null) {
    delayRate = process.env.LOAD_DELAY;
  }
  console.log('Delay rate is: ' + delayRate);
  loop();
}

// Read in the command line argument for hostname
// if (process.argv.length > 2) {
//   hostname = process.argv[2];
// }

setTimeout(start(), 5000);
// addUser();
