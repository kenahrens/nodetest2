var request = require('supertest');

describe('loading express', function() {
  var server;
  beforeEach(function() {
    server = require('../bin/www');
  });
  afterEach(function() {
    server.close();
  });
  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
})
