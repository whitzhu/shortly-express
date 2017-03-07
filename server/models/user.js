var db = require('../db');
var utils = require('../lib/utility');

// Write you user database model methods here

module.exports = {
  insertUsers: function(param) {
    db.query('insert into users set ?', param, function(error, success) {
      if (error) {
        console.log('Received error within insertUsers:', error);
      } else {
        console.log('Successfully insertedUsers!');
      }
    });
  }
};
