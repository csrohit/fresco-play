var supertest = require('supertest');
var assert = require('assert');

var createdSegment;
require('../bootstrap.test');

describe('Manufacturer Controller', function () {
  let id = null;
  it('Get all manufacturers: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .get('/manufacturer')
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

  it('Insert new manufacturer: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    const manufacturer = {
      name: "test",
    }
    agent
      .post('/manufacturer')
      .send(manufacturer)
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


  it('Find manufacturer: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .get('/manufacturer/' + id)
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
  it('Find Manufacturer: Not found', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .get('/manufacturer/599')
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
  it('Find Manufacturer: Bad request', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .get('/manufacturer/abcd')
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
  it('Update manufacturer: OK', (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    agent
      .put('/manufacturer/' + id)
      .send({
        name: "test"
      })
      .expect(200)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          result.body.length.should.be.aboveOrEqual(0);
          done();
        }
      });
  });
  it('Update manufacturer: Bad request', (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    agent
      .put('/manufacturer/abcd')
      .send({
        name: "test"
      })
      .expect(400)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          // result.body.length.should.be.aboveOrEqual(0);
          done();
        }
      });
  });
  it('Update manufacturer: Not found', (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    let temp = 0;
    const manufacturer = {
      name: "test1",
    }
    // agent
    //   .post('/manufacturer')
    //   .send(manufacturer)
    //   .end(function (err, result) {
    //     if (err) {
    //       done(err);
    //     } else {
    //       temp = result.body.id;
    agent
      .put('/manufacturer/' + 999)
      .send({
        name: "test"
      })
      .expect(404)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          // result.body.length.should.be.aboveOrEqual(0);
          done();
        }
      });
    //   }
    // });

  });


  it('Delete manufacturer', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete('/manufacturer/' + id)
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
  it('Delete manufacturer: Bad Request', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete('/manufacturer/abcd')
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
  it('Delete all manufacturers: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete('/manufacturer')
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