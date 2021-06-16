var supertest = require('supertest');
var assert = require('assert');

var createdSegment;
require('../bootstrap.test');

describe('Accessory Controller', function () {
  let id = null;
  it('Get all accessories: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .get('/accessories')
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

  it('Delete all accessories', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete('/accessories')
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

  it('Insert new accessory: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    const segment = {
      "name": "Car DVR Camera",
      "price": 788
    }
    agent
      .post('/accessories')
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
  it('Insert new accessory: Bad Request', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    const segment = {
      "name": "Car DVR Camera"
    }
    agent
      .post('/accessories')
      .send(segment)
      .expect(400)
      .end(function (err, result) {
        if (err) {
          done(err);
        } else {
          // id = result.body.id;
          done();
        }
      });
  });


  it('Find accessory: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .get('/accessories/' + id)
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
  it('Find accessory: Bad Request', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .get('/accessories/abcd')
      .send()
      // .expect(400)
      .end(function (err, result) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
  it('Find accessory: : Not Found', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .get('/accessories/999')
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



  it('Update accessory: OK', (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    agent
      .put('/accessories/' + id)
      .send({ name: 'rohit', price: 20 })
      .expect(200)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  //  it('Update accessory: Not Found', (done) => {
  //   const agent = supertest.agent(sails.hooks.http.app);
  //   agent
  //     .put('/accessories/999')
  //     .send({ name: 'rohit', price: 20 })
  //     .expect(404)
  //     .end((err, result) => {
  //       if (err) {
  //         done(err);
  //       } else {
  //         done();
  //       }
  //     });
  // });
  it('Delete accessory: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete('/accessories/' + id)
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


