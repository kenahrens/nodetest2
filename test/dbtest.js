var request = require('supertest');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest2');

describe('testing db', function() {
  var server;
  before(function() {
    server = require('../bin/www');
  });
  after(function() {
    server.close();
  });
  it('add a user', function testSlash(done) {
    request(server)
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
