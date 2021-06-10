/**
 * CarsController
 * @description :: Server-side logic for managing Carscontrollers
 */

module.exports = {

  fetch: function(req, res, next) {
    Cars.find()
      .populate('segment', 'manufacturer','variants')
      .exec(function(err, cars) {
        if (err) return next(err);
        return res.json(cars);
      });
  },

  create: function(req, res, next) {
    var carData = req.body;
    Cars.create(carData)
      .exec(function(err, cars) {
        if (err) {
          sails.log.debug('Some error occured ' + err);
          return res.badRequest(err);
        }
        return res.json(cars);
      });
  },


  update: function(req, res, next) {
    var id = parseInt(req.param('id'));
    if (!id) {
      return res.badRequest('Required param: id not provided.');
    }
    var params = {};
    params = _.merge({}, req.params.all(), req.body);
    Cars.update(id, params, function(err, cars) {
      if (cars.length === 0) return res.notFound({
        "error": "Record not found."
      });
      if (err) return next(err);
      res.json(cars);
    });
  },

  delete: function(req, res) {
    var id = parseInt(req.param('id'));
    if (!id) {
      return res.badRequest({
        "error": "ID should be an integer and is required"
      });
    }
    Cars.findOne({
      id: id
    }).exec(function(err, result) {
      if (err) return res.serverError(err);
      if (!result) return res.notFound({
        "error": "Record not found."
      });
      Cars.destroy(id, function(err) {
        if (err) return next(err);
        return res.json(result);
      });
    });
  },

  deleteAll: function(req, res, next) {
    Cars.destroy()
      .exec(function(err) {
        if (err) return next(err);
        return res.send();
      });
  },
  search: function(req, res, next) {
    var where = req.param('where');
    var query = {};

    if (where != undefined && _.isString(where))
      query["where"] = JSON.parse(where);
    if (req.param('limit') != undefined)
      query["limit"] = req.param('limit');
    if (req.param('skip') != undefined)
      query["skip"] = req.param('skip');
    if (req.param('sort') != undefined)
      query["sort"] = req.param('sort');

    Cars.find(query)
      .exec(function(err, cars) {
        if (err) return res.badRequest(err);
        if(cars.length > 0)
          return res.json(cars);
        else
          return res.notFound(cars);
      });
  },

};
