var supertest = require('supertest');

describe('user functionality tests', function() {
  this.timeout(10000);

  var server;
  beforeEach(function() {
    delete require.cache[require.resolve('../../bin/www')];
    server = require('../../bin/www');
  });
  afterEach(function() {
    server.close();
  });
  it('redirects /user to /user/list', function(done) {
    supertest(server)
      .get('/user/')
      .expect(302, done);
  });
  it('loads new user form', function(done) {
    supertest(server)
      .get('/user/new')
      .expect(200, done);
  })
  it('adds a user', function testAdd(done) {
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
      .post('/user/add')
      .send(form)
      .expect(302, done);
  });
  it('gets the user list', function testList(done) {
    supertest(server)
      .get('/user/list')
      .expect(200, done);
  });
  it('runs a search', function testSearch(done) {
    supertest(server)
      .post('/user/runsearch')
      .send({'searchterm': 'booyah'})
      .expect(200, done);
  });
});
