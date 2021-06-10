module.exports = {
  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: 'string',
      required: true
    },
    segment: {
      model: 'segment'
    },
    manufacturer: {
      model: 'manufacturer'
    },
    variants: {
      collection: "Variant",
      via: "cars",
      dominant: true
    },
    accessories:{
      collection: "Accessories",
      via: "cars",
      dominant: true
    },
    description: {
      type: 'string',
    }

  },
  beforeCreate: function(criteria, cb) {
    Manufacturer.findOne({
        id: criteria.manufacturer
      })
      .exec(function(err, manufacturer) {
        if (manufacturer == undefined) {
          var notExists = new Error();
          notExists.message = require('util').format('manufacturer not exists');
          notExists.status = 404;
          cb(notExists);
        } else {
          Segment.findOne({
              id: criteria.segment
            })
            .exec(function(err, segment) {
              if (segment == undefined) {
                var notExists = new Error();
                notExists.message = require('util').format('segment not exists');
                notExists.status = 404;
                cb(notExists);
              } else {
                cb();
              }
            });
        }
      });
  }
};
