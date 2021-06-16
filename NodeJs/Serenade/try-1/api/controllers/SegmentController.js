/**
 * SegmentController
 *
 * @description :: Server-side logic for managing Segmentcontrollers
 */

module.exports = {

  fetch: function (req, res, next) {
    Segment.find()
      .populate('cars')
      .exec(function (err, segment) {
        if (err) return next(err);
        return res.json(segment);
      });
  },

  create: function (req, res, next) {
    var params = req.body;
    Segment.create(params)
      .exec(function (err, segment) {
        if (err) return next(err);
        return res.json(segment);
      });
  },

  findOne: function (req, res, next) {
    var id = parseInt(req.param('id'));
    console.log(id);
    if (!id) {
      console.log('true');
      return res.badRequest('Required param: id not provided.');
    } else {
      console.log('false');
    }
    Segment.findOne({
      id: id
    })
      .populate('cars')
      .exec(function (err, segment) {
        if (segment === undefined) return res.notFound({
          "error": "Segment not found."
        });
        if (err) return next(err);
        return res.json(segment);
      });
  },

  update: function (req, res, next) {
    var id = parseInt(req.param('id'));
    if (!id) {
      return res.badRequest('Required param: id not provided.');
    }
    var params = {};
    params = _.merge({}, req.params.all(), req.body);
    Segment.update(id, params, function (err, segment) {
      if (segment === undefined) return res.notFound({
        "error": "Record not found."
      });
      if (err) return next(err);
      res.json(segment);
    });
  },

  delete: function (req, res, next) {
    var id = parseInt(req.param('id'));
    if (!id) {
      return res.badRequest({
        "error": "ID should be an integer and is required"
      });
    }
    Segment.findOne(id, function (err, result) {
      if (err) return res.serverError(err);
      if (!result) return res.notFound({
        "error": "Record not found."
      });
      Segment.destroy(id, function (err) {
        if (err) return next(err);
        return res.json(result);
      });
    });
  },
  deleteAll: function (req, res, next) {
    Segment.destroy()
      .exec(function (err) {
        if (err) return next(err);
        return res.send();
      });
  }
};
