var supertest = require('supertest');
var assert = require('assert');

var createdCar;
require('../bootstrap.test');

describe('Car Controller', function () {
  let id = null;
  let manufacturerId = null;
  let segmentId = null;
  let accessoryId = null;
  let variantId = null;
  it('Get all cars: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .get('/car')
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



  it('Insert new car: OK', function (done) {
    const variant = {
      "name": "REVETRQE XM",
      "type": "Diesel",
      "capacity": "1497 cc",
      "price": "7.62 Lakh"
    };

    const manufacturer = {
      "name": "Toyota"
    };

    const segment = {
      "name": "MPV"
    };
    const accessory = {
      "name": "Car DVR Camera",
      "price": 788
    };
    const car = {
      "name": "Honda City",
      "segment": null,
      "description": "This is a dummy text",
      "manufacturer": null,
      "variants": [],
      "accessories": []
    }
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .post('/manufacturer')
      .send(manufacturer)
      .expect(200)
      .end(function (err, result) {
        if (err) {
          done(err);
        } else {
          manufacturerId = car.manufacturer = result.body.id;
          agent
            .post('/segment')
            .send(segment)
            .expect(200)
            .end(function (err, result) {
              if (err) {
                done(err);
              } else {
                segmentId = car.segment = result.body.id;
                agent
                  .post('/variant')
                  .send(variant)
                  .expect(200)
                  .end(function (err, result) {
                    if (err) {
                      done(err);
                    } else {
                      variantId = result.body.id;
                      car.variants.push(result.body.id);
                      agent
                        .post('/accessories')
                        .send(accessory)
                        .expect(200)
                        .end(function (err, result) {
                          if (err) {
                            done(err);
                          } else {
                            accessoryId = result.body.id;
                            car.accessories.push(result.body.id);
                            agent
                              .post('/car')
                              .send(car)
                              .expect(200)
                              .end(function (err, result) {
                                if (err) {
                                  done(err);
                                } else {
                                  id = result.body.id;
                                  done();
                                }
                              });
                          }
                        });
                    }
                  });
              }
            });
        }
      });
  });

  it('Insert new Car (Manufacturer): Bad Request', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    const car = {
      "name": "Tata Nexon",
      "segment": segmentId,
      "description": "This is a dummy text",
      "manufacturer": 999,
      "variants": [variantId],
      "accessories": [accessoryId]
    }
    agent
      .post('/car')
      .send(car)
      .expect(400)
      .end(function (err, result) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('Insert new Car (Segment): Bad Request', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    const car = {
      "name": "Tata Nexon",
      "segment": 999,
      "description": "This is a dummy text",
      "manufacturer": manufacturerId,
      "variants": [variantId],
      "accessories": [accessoryId]
    }
    agent
      .post('/car')
      .send(car)
      .expect(400)
      .end(function (err, result) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
  it('Insert new Car: Bad Request', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    const car = {
      "name": "Tata Nexon",
      "segment": 1,
      "description": "This is a dummy text",
      "manufacturer": 1,
      "variants": [1, 2, 3, 4],
      "accessories": [1, 4, 5, 8]
    }
    agent
      .post('/car')
      .send(car)
      .expect(400)
      .end(function (err, result) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });


  it('Update car: OK', (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    agent
      .put('/car/' + id)
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
  it('Update car: Bad Request', (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    agent
      .put('/car/abcd')
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

  it('Update car: Not Found', (done) => {
    const agent = supertest.agent(sails.hooks.http.app);
    agent
      .put('/car/999')
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

  it('Delete car: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete('/car/' + id)
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

  it('Delete car: Bad Request', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete('/car/abcd')
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

  it('Delete car: Not Found', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete('/car/999')
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

  it('Delete all cars: OK', function (done) {
    var agent = supertest.agent(sails.hooks.http.app);
    agent
      .delete('/car')
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