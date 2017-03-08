var Sessions = require('../models/session');
var util = require('../lib/utility');
var _ = require('underscore');

var createSession = function(req, res, next) {
  var session = {};
  res.cookies.shortlyid = res.cookies.shortlyid || {};
  if (!req.headers.session) {
    req.session = {hash: undefined};
  }
  if (res.cookies.shortlyid.value) {
    console.log('...response.cookies.shortlyid.value', res.cookies.shortlyid.value);
    req.session = {};
    req.session.hash = res.cookies.shortlyid.value;
  } else {
    var salt = util.createSalt();
    var tempPassword = { password: salt };
    util.hashFunction(tempPassword, function(hash) {
      Sessions.insertSessions({
        hash: hash.password,
        salt: salt
      });
      req[session] = {};
      req.session.hash = hash.password;
      res.cookie('shortlyid', hash.password);
      next();
    });
  }
};

module.exports = createSession;

