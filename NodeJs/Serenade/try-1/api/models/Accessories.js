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
    price:{
      type: 'integer'
    },
    cars: {
      collection: "cars",
      via: "accessories"
    }
  }
};
