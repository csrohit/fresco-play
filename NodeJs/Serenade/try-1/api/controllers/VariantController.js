/**
 * VariantController
 *
 * @description :: Server-side logic for managing variants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	fetch: function(req, res, next) {
     Variant.find()
      .populate('cars')
      .exec(function(err,  variant) {
        if (err) return next(err);
        return res.json( variant);
      });
  },

  create: function(req, res, next) {
    var carData = req.body;
     Variant.create(carData)
      .exec(function(err,  variant) {
        if (err) {
          sails.log.debug('Some error occured ' + err);
          return res.badRequest(err);
        }
        return res.json( variant);
      });
  },

  update: function(req, res, next) {
    var id = parseInt(req.param('id'));
    if (!id) {
      return res.badRequest('Required param: id not provided.');
    }
    var params = {};
    params = _.merge({}, req.params.all(), req.body);
     Variant.update(id, params, function(err,  variant) {
      if ( variant.length === 0) return res.notFound({
        "error": "Record not found."
      });
      if (err) return next(err);
      res.json( variant);
    });
  },

  delete: function(req, res) {
    var id = parseInt(req.param('id'));
    if (!id) {
      return res.badRequest({
        "error": "ID should be an integer and is required"
      });
    }
     Variant.findOne({
      id: id
    }).exec(function(err, result) {
      if (err) return res.serverError(err);
      if (!result) return res.notFound({
        "error": "Record not found."
      });
       Variant.destroy(id, function(err) {
        if (err) return next(err);
        return res.json(result);
      });
    });
  },

  deleteAll: function(req, res, next) {
     Variant.destroy()
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

     Variant.find(query)
      .exec(function(err,  variant) {
        if (err) return res.badRequest(err);
        if( variant.length > 0)
          return res.json( variant);
        else
          return res.notFound( variant);
      });
  },

};
