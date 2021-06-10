module.exports = {
  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    type: {
      type: 'string',
      enum: ['Petrol', 'Diesel', 'Hybrid']
    },
    capacity: {
      type: 'integer',
    },
    price: {
      type: 'integer',
    },
    cars: {
      collection: "cars",
      via: "variants"
    }
  }
};
