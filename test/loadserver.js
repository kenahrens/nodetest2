var supertest = require('supertest');
var server;

describe('loading express', function() {
  var server;
  before(function() {
    server = require('../bin/www');
  });
  after(function() {
    server.close();
  });
  it('GET /', function testSlash(done) {
    supertest(server)
      .get('/')
      .expect(200, done);
  });
  it('GET /helloworld', function testSlash(done) {
    supertest(server)
      .get('/helloworld')
      .expect(200, done);
  });
})
