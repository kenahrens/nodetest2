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
  it('GET /helloworld', function testHello(done) {
    supertest(server)
      .get('/helloworld')
      .expect(200, done);
  });
});
