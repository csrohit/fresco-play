/**
 * ManufacturerController
 * @description :: Server-side logic for managing ManufacturerControllers
 */

module.exports = {

  fetch: function (req, res, next) {
    Manufacturer.find()
      .populate('cars')
      .exec(function (err, manufacturer) {
        if (err) return next(err);
        return res.json(manufacturer);
      });
  },

  create: function (req, res, next) {
    var params = req.body;
    Manufacturer.create(params)
      .exec(function (err, manufacturer) {
        if (err) return next(err);
        return res.json(manufacturer);
      });
  },

  findOne: function (req, res, next) {
    var id = parseInt(req.param('id'));
    if (!id) {
      return res.badRequest('Required param: id not provided.');
    }
    Manufacturer.findOne({
      id: id
    })
      .populate('cars')
      .exec(function (err, manufacturer) {
        if (manufacturer === undefined) return res.notFound({
          "error": "Manufacturer not found."
        });
        if (err) return next(err);
        return res.json(manufacturer);
      });
  },

  update: function (req, res, next) {
    var id = parseInt(req.param('id'));
    if (!id) {
      return res.badRequest('Required param: id not provided.');
    }
    var params = {};
    params = _.merge({}, req.params.all(), req.body);
    Manufacturer.update(id, params, function (err, manufacturer) {
      console.log(err);
      if (manufacturer === undefined) return res.notFound({
        "error": "Record not found."
      });

      if (err) return next(err);
      res.json(manufacturer);
    });
  },

  delete: function (req, res, next) {
    var id = parseInt(req.param('id'));
    if (!id) {
      return res.badRequest({
        "error": "ID should be an integer and is required"
      });
    }
    Manufacturer.findOne({
      id: id
    }).exec(function (err, result) {
      if (err) return res.serverError(err);
      if (!result) return res.notFound({
        "error": "Record not found."
      });
      Manufacturer.destroy(id, function (err) {
        if (err) return next(err);
        return res.json(result);
      });
    });
  },

  deleteAll: function (req, res, next) {
    Manufacturer.destroy()
      .exec(function (err) {
        if (err) return next(err);
        return res.send();
      });
  }
};
