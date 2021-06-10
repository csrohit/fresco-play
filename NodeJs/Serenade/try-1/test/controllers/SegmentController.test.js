var supertest = require('supertest');
var assert = require('assert');

var createdSegment;
require('../bootstrap.test');

describe('Segment Controller', function() {
  it('get /segment', function(done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .get('/segment')
      .send()
      .expect(200)
      .end(function(err, result) {
        if (err) {
          done(err);
        } else {
          result.body.length.should.be.aboveOrEqual(0);
          done();
        }
      });
  });

});