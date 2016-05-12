var supertest = require('supertest');

describe('API Basic Test Scenarios', function() {
  this.timeout(10000);
  
  var server;
  beforeEach(function() {
    delete require.cache[require.resolve('../../bin/www')];
    server = require('../../bin/www');
  });
  afterEach(function() {
    server.close();
  });
  it('GET /api root should return 200', function(done) {
    supertest(server)
      .get('/api')
      .expect(200, done);
  });
  it('GET all users', function(done) {
    supertest(server)
      .get('/api/users')
      .expect(200, done);
  });
});
