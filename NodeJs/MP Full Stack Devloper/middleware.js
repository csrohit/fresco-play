let jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = (req, res, next) => {

    /*write your middleware code here*/
    next();
	};


module.exports = {
  checkToken: checkToken
}