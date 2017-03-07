var parseCookies = function(req, res, next) {
  var cookieObj = {};
  if (req.headers.cookie) {
    var cookieArray = req.headers.cookie.split('; ');
    cookieArray.forEach(function(cookie) {
      var cookieSplit = cookie.split('=');
      cookieObj[cookieSplit[0]] = cookieSplit[1];
    });
    req.headers.cookie = cookieObj;
  } else {
    req.headers.cookie = cookieObj;
  }
};

module.exports = parseCookies;




// 723948ujaskdjf; ==> fred

// "abc" => abc