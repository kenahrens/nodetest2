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
    request
      .get(uri)
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
  var uri = 'http://' + hostname + port + '/user/add'
  var options = {
    'method': 'POST',
    'uri': uri
  }
}

// Run the Search
function search() {

}

function loop() {
  get('/');
  get('/helloworld');
  get('/user/new');
  get('/user/list');
  get('/user/search');



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