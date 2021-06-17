var supertest = require('supertest');
var assert = require('assert');

var createdSegment;
require('../bootstrap.test');

describe('Segment Controller', function () {
  let id = null;
  it('Get all segments: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .get('/segment')
      .send()
      .expect(200)
      .end(function (err, result) {
        if (err) {
          done(err);
        } else {
          result.body.length.should.be.aboveOrEqual(0);
          done();
        }
      });
  });



  it('Insert new segment: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    const segment = {
      name: "SUV"
    }
    agent
      .post('/segment')
      .send(segment)
      .expect(200)
      .end(function (err, result) {
        if (err) {
          done(err);
        } else {
          id = result.body.id;
          done();
        }
      });
  });

  it('Find segment: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .get('/segment/' + id)
      .send()
      .expect(200)
      .end(function (err, result) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
  it('Find segment: Bad Request', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .get('/segment/abcd')
      .send()
      .expect(400)
      .end(function (err, result) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
  it('Find segment: : Not Found', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .get('/segment/999')
      .send()
      .expect(404)
      .end(function (err, result) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
  it('Update segment: OK', (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    agent
      .put('/segment/' + id)
      .send({ name: 'Sedan' })
      .expect(200)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
  it('Update segment: Bad Request', (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    agent
      .put('/segment/abcd')
      .send({ name: 'Sedan' })
      .expect(400)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('Update segment: Not Found', (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    agent
      .put('/segment/999')
      .send({ name: 'Sedan' })
      .expect(404)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('Delete segment: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete('/segment/' + id)
      .send()
      .expect(200)
      .end(function (err, result) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('Delete segment: Bad Request', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete('/segment/abcd')
      .send()
      .expect(400)
      .end(function (err, result) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('Delete segment: Not Found', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete('/segment/999')
      .send()
      .expect(404)
      .end(function (err, result) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('Delete all segments', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete('/segment')
      .send()
      .expect(200)
      .end(function (err, result) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});