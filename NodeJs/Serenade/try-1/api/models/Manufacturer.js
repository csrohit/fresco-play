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
    cars: {
      collection: 'Cars',
      via: 'manufacturer'
    }
  }
};
