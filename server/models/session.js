var db = require('../db');
var util = require('../lib/utility');

// Write you session database model methods here

module.exports = {
  insertSessions: function(param) {
    db.query('insert into session set ?', param, function (error, success) {
      if (error) {
        console.log('error', error);
      } else {
        console.log('Successfully insertedSessionInfo!');
      }
    });
  }
};
