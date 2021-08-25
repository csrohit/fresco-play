let User = require('../models/user');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports = async function (req, res) {

    /*write your code here*/
    User.findById(req.body.uid, (err, user) => {
        if (err)
            return res.status(401).json(err);

        user.email = req.body.email;
        user.mobile = req.body.mobile;
        user.location = req.body.location;

        user.save((err, usr) => {
            if (err)
                return res.status(400).json(err);
            return res.json(usr)
        });
    })
}
