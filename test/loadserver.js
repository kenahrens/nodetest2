var supertest = require('supertest');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest2');

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
  it('add a user', function testSlash(done) {
    supertest(server)
      .post('/adduser')
      .field('fname', 'Node')
      .field('lname', 'Js')
      .field('userName', 'booyah')
      .field('userEmail', 'booyah@gmail.com')
      .field('addstreet', '100 Sunset Blvd')
      .field('addcity', 'Beverly Hills')
      .field('addstate', 'CA')
      .field('addzip', '90210')
      .expect(302, done);
  });
})
