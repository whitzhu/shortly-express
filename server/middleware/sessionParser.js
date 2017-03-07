var Sessions = require('../models/session');
var util = require('../lib/utility');
var _ = require('underscore');

var createSession = function(req, res, next) {
  var session = {};
  if (!req.headers.session) {
    req.session = {hash: undefined};
  }
  // console.log('*****REQ:', req);
  console.log('*****REQ:', req.headers.cookie);
  if (!_.isEmpty(req.headers.cookie)) {
    req.session = {};
    req.session.hash = 'abcd123plspass';
    console.log('....within req.headers.cookies', req);
  } else {
    var salt = { password: new Date().toString() };
    util.hashFunction(salt, function(hash) {
      Sessions.insertSessions({
        hash: hash.password
      });
      req[session] = {};
      req.session.hash = hash.password;
      res.set({
        'Set-Cookie': 'shortlyid=' + hash
      });
      
      // console.log('Within sessionParser/createSession headers.cookies:', res.headers['cookies']);
      res.send();
    });
  }
};
// var createSession = function(req, res, next) {
//   var sessionInitialization = function(req, res) {
//     req.session = {};
//     req.session.hash = 'fill';
//     var salt = { password: new Date().toString() };
//     util.hashFunction(salt, function(hash) {
//       //results -->[row {password: 8923742u3ajsldkf}]
//       Sessions.insertSessions({
//         hash: hash.password
//       });
//     res.set({

//     })
//     res.cookies;
//   };
//   if (_.isEmpty(req.headers.cookie)) {
//     sessionInitialization(req, res);
//   }
// };

module.exports = createSession;


// util.checkUserExist(req.body, function(userid) {
//userid -->[row {userid: 2}]
