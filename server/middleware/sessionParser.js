var Sessions = require('../models/session');
var util = require('../lib/utility');

var createSession = function(req, res, next) {
  var session = {};
  if (req.headers.hasOwnProperty('cookie')) {

  } else {
    var salt = { password: new Date().toString() };
    util.hashFunction(salt, function(hash) {
      //results -->[row {password: 8923742u3ajsldkf}]
      Sessions.insertSessions({
        hash: hash.password
      });
    });
  }
};

module.exports = createSession;


// util.checkUserExist(req.body, function(userid) {
//userid -->[row {userid: 2}]