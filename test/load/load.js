const request = require('request');

// Global variables
var hostname = 'localhost';
var port = ':3000'
var requestCount = 0;
var responseCount = 0;

// Get a specific endpoint (with some randomness)
function get(endpoint) {
  var uri = 'http://' + hostname + port + endpoint;
  
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

  var uri = 'http://' + hostname + port + '/user/add';
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
  var uri = 'http://' + hostname + port + '/user/runsearch';
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
  get('/');
  get('/helloworld');
  get('/user/new');
  get('/user/list');
  get('/user/search');
  get('/api/')

  var delay = Math.random() * 10000;
  setTimeout(loop, delay);
}

function start() {
  console.log('Running tests against: ' + hostname);
  loop();
}

// Read in the command line argument for hostname
if (process.argv.length > 2) {
  hostname = process.argv[2];
}

setTimeout(start(), 10);
// addUser();