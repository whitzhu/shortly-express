var Promise = require('bluebird');
var request = Promise.promisify(require('request'), { multiArgs: true });
var crypto = require('crypto');
var db = require('../db');

exports.getUrlTitle = function(url) {
  return request(url).then(function(response, html) {
    var tag = /<title>(.*)<\/title>/;
    var match = response[0].body.match(tag);
    var title = match ? match[1] : url;
    return title;
  });
};

var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};

/************************************************************/
// Add additional utility functions below
/************************************************************/
//hash.update --> Updates hash content when given data
//hash.digest --> Digest locks down the hash so that it is not used again. Uniquify

exports.hashFunction = function(object, callback) {
  var hash = crypto.createHash('sha1').update(object.password);
  object.password = hash.digest('hex'); 
  callback(object);
};

exports.checkUserExist = function(object, callback) {
  var queryString = 'Select id from users where username = ?';
  db.query(queryString, object.username, function(err, results) {
    if (err) {
      console.log('Error received within utility/checkuserexist', err);
    } else {
      callback(results);
    }
  });
};

exports.logInCheck = function(object, callback) {
  var queryString = 'select password from users where username = ?';
  db.query(queryString, object.username, function(err, results) {
    if (err) {
      console.log('error', err);
    } else {
      callback(results);
    }
  });
};




