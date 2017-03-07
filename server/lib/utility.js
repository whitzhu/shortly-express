var Promise = require('bluebird');
var request = Promise.promisify(require('request'), { multiArgs: true });
var crypto = require('crypto');

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

// var exampleObj = {
//   'username': 'Samantha',
//   'password': 'Samantha'
// };
var hashFunction = function(object) {
  console.log('....Before hash', object);
  var hash = crypto.createHash('sha1');
  object.password = hash.digest('hex');
  console.log('///////hashFunction', object.password);
};



// var shasum = crypto.createHash('sha1');
//   shasum.update(link.url);
//   link.code = shasum.digest('hex').slice(0, 5);

//   return db.queryAsync(queryString, link);