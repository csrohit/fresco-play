module.exports.routes = {
  '/': {
    view: 'homepage'
  },

  'POST    /car': 'CarsController.create',
  'GET     /car': 'CarsController.fetch',
  'PUT     /car/:id': 'CarsController.update',
  'DELETE  /car/:id': 'CarsController.delete',
  'DELETE  /car': 'CarsController.deleteAll',
  'GET  /car/search': 'CarsController.search',

  'POST    /manufacturer': 'ManufacturerController.create',
  'GET     /manufacturer': 'ManufacturerController.fetch',
  'PUT     /manufacturer/:id': 'ManufacturerController.update',
  'GET     /manufacturer/:id': 'ManufacturerController.findOne',
  'DELETE  /manufacturer/:id': 'ManufacturerController.delete',
  'DELETE  /manufacturer': 'ManufacturerController.deleteAll',

  'POST    /segment': 'SegmentController.create',
  'GET     /segment': 'SegmentController.fetch',
  'PUT     /segment/:id': 'SegmentController.update',
  'GET     /segment/:id': 'SegmentController.findOne',
  'DELETE  /segment/:id': 'SegmentController.delete',
  'DELETE  /segment': 'SegmentController.deleteAll',

  'POST    /accessories': 'AccessoriesController.create',
  'GET     /accessories': 'AccessoriesController.fetch',
  'PUT     /accessories/:id': 'AccessoriesController.update',
  'DELETE  /accessories/:id': 'AccessoriesController.delete',
  'DELETE  /accessories': 'AccessoriesController.deleteAll',
  'GET  /accessories/search/:where': 'AccessoriesController.search',

  'POST    /variant': 'VariantController.create',
  'GET     /variant': 'VariantController.fetch',
  'PUT     /variant/:id': 'VariantController.update',
  'DELETE  /variant/:id': 'VariantController.delete',
  'DELETE  /variant': 'VariantController.deleteAll',
  'GET  /variant/search': 'VariantController.search',

};
