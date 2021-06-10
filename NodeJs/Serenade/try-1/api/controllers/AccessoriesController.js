/**
 * AccessoriesController
 *
 * @description :: Server-side logic for managing Accessories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  fetch: function(req, res, next) {
    Accessories.find()
      .populate('cars')
      .exec(function(err, accessories) {
        if (err) return next(err);
        return res.json(accessories);
      });
  },

  create: function(req, res, next) {
    var accessoriesData = req.body;
    Accessories.create(accessoriesData)
      .exec(function(err, accessories) {
        if (err) {
          sails.log.debug('Some error occured ' + err);
          return res.badRequest(err);
        }
        return res.json(accessories);
      });
  },

  update: function(req, res, next) {
    var id = parseInt(req.param('id'));
    if (!id) {
      return res.badRequest('Required param: id not provided.');
    }
    var params = {};
    params = _.merge({}, req.params.all(), req.body);
    Accessories.update(id, params, function(err, accessories) {
      if (accessories.length === 0) return res.notFound({
        "error": "Record not found."
      });
      if (err) return next(err);
      res.json(accessories);
    });
  },

  delete: function(req, res) {
    var id = parseInt(req.param('id'));
    if (!id) {
      return res.badRequest({
        "error": "ID should be an integer and is required"
      });
    }
    Accessories.findOne({
      id: id
    }).exec(function(err, result) {
      if (err) return res.serverError(err);
      if (!result) return res.notFound({
        "error": "Record not found."
      });
      Accessories.destroy(id, function(err) {
        if (err) return next(err);
        return res.json(result);
      });
    });
  },

  deleteAll: function(req, res, next) {
    Accessories.destroy()
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

    Accessories.find(query)
      .exec(function(err, accessories) {
        if (err) return res.badRequest(err);
        if(accessories.length > 0)
          return res.json(accessories);
        else
          return res.notFound(accessories);
      });
  },

};
