var supertest = require('supertest');

describe('basic api test', function() {
  this.timeout(5000);
  
  var server;
  beforeEach(function() {
    delete require.cache[require.resolve('../../bin/www')];
    server = require('../../bin/www');
  });
  afterEach(function() {
    server.close();
  });
  it('GET /api', function testSlash(done) {
    supertest(server)
      .get('/api')
      .expect(200, done);
  });
});
