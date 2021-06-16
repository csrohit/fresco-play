var supertest = require('supertest');
var assert = require('assert');

var createdSegment;
require('../bootstrap.test');

describe('Variant Controller', function () {
  let id = null;
  it('Get all variants', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .get('/variant')
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

  it('Insert new variant: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    const variant = {
      "name": "REVETRQE  XE",
      "type": "Diesel",
      "capacity": "1497 cc",
      "price": "6.99 Lakh"
    }
    agent
      .post('/variant')
      .send(variant)
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
  it('Insert new variant: Bad Request', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    const variant = {
      "name": "REVETRQE  XE"
    }
    agent
      .post('/variant')
      .send(variant)
      .expect(400)
      .end(function (err, result) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });


  it('Update variant: OK', (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    agent
      .put('/variant/' + id)
      .send({
        "name": "REVETRQE  XE1",
        "type": "Diesel",
        "capacity": "1497 cc",
        "price": "6.99 Lakh"
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

  it('Update variant: Bad Request', (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    agent
      .put('/variant/abcd')
      .send({
        "name": "REVETRQE  XE1",
        "type": "Diesel",
        "capacity": "1497 cc",
        "price": "6.99 Lakh"
      })
      .expect(400)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });


  // it('Update variant: Not Found', (done) => {
  //   const agent = supertest.agent(sails.hooks.http.app);
  //   agent
  //     .put('/variant/999')
  //     .send({
  //       "name": "REVETRQE  XE1",
  //       "type": "Diesel",
  //       "capacity": "1497 cc",
  //       "price": "6.99 Lakh"
  //     })
  //     .expect(404)
  //     .end((err, result) => {
  //       if (err) {
  //         done(err);
  //       } else {
  //         done();
  //       }
  //     });
  // });




  it('Delete variant: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete('/variant/' + id)
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
  it('Delete variant: Not Found', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete('/variant/000')
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
  it('Delete variant: Bad Request', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete('/variant/abcd')
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




  it('Delete all variants: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete('/variant')
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