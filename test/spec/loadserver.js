var supertest = require('supertest');

describe('basic express test', function() {
  this.timeout(5000);
  
  var server;
  beforeEach(function() {
    delete require.cache[require.resolve('../../bin/www')];
    server = require('../../bin/www');
  });
  afterEach(function() {
    server.close();
  });
  it('GET /', function testSlash(done) {
    supertest(server)
      .get('/')
      .expect(200, done);
  });
  it('GET /helloworld', function testHello(done) {
    supertest(server)
      .get('/helloworld')
      .expect(200, done);
  });
});
