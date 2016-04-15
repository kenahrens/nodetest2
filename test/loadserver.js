var supertest = require('supertest');

describe('loading express', function() {
  var server;
  beforeEach(function() {
    server = require('../bin/www');
  });
  afterEach(function() {
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
