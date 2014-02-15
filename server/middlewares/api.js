module.exports = {
  requiresLogin: function(req, res, next) {
    if (!(req.signedCookies.isAuthenticated && req.signedCookies.isAuthenticated == 'true'))
      return res.send(401);

    next();
  },
  onlyJSON: function(req, res, next) {
    if (!req.accepts('json')) return res.send(406);

    next();
  },
  loadVlineUserId: function(req, res, next) {
    if (req.params.vlineUserId.substring(0, 5) === "1000:") {
      req.vlineUserId = req.params.vlineUserId;
    } else {
      return res.send(400);
    };

    return next();
  }
};