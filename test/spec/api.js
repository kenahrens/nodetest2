var supertest = require('supertest');

describe('API Basic Test Scenarios', function() {
  this.timeout(15000);

  var server;
  beforeEach(function() {
    delete require.cache[require.resolve('../../bin/api')];
    server = require('../../bin/api');
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
  it('can add a new user', function(done) {
    const faker = require('faker');
    var username = faker.internet.userName();
    var form = {
      'fname': faker.name.firstName(),
      'lname': faker.name.lastName(),
      'username': username,
      'useremail': faker.internet.email(),
      'addstreet': faker.address.streetAddress(),
      'addcity': faker.address.city(),
      'addstate': faker.address.stateAbbr(),
      'addzip': faker.address.zipCode()
    };
    supertest(server)
      .post('/api/user')
      .send(form)
      .expect(200, done);
  })
});
