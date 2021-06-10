var Sails = require('sails');
var Barrels = require('barrels');
global.chai = require('chai');
global.should = chai.should();

require('should');

before(function(done) {

  Sails.lift({
    log: {
      level: 'error'
    },
    models: {
      connection: 'test',
      migrate: 'drop'
    }
  }, function(err) {
    if (err)
      return done(err);
    else {
      var barrels = new Barrels();
      fixtures = barrels.data;
      return done();
    }
  });
});

// Global after hook
after(function(done) {
  console.log();
  Sails.lower(done);
});
