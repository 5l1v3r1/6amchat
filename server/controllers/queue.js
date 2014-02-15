'use strict';

var queueCtrl = function() {
  var queue = [];

  var _postUser = function(req, res) {
    var userId = req.vlineUserId;
    console.yellow(userId + " requesting for partner");
    var partnerId = queue.shift() || null;

    // unless partnerId is truthy add the current user to the queue
    if (!partnerId) {
      queue.push(userId);
      console.yellow('User added to queue – no partner exists');
    };

    // if the user selected from the queue is the same as the current user
    // add the current user to the queue
    if (partnerId === userId) {
      partnerId = null;
      queue.push(userId);
      console.yellow('User added to queue – partner retrieved is said user');
    };

    if (partnerId) console.yellow('Partner is ' + partnerId);

    res.json({ userId: partnerId });
  };

  var _delUser = function(req, res) {
    var userId = req.vlineUserId;
    var index = queue.indexOf(userId);
    if (index >= 0) {
      queue.splice(index, 1);
      console.yellow(userId + ' removed from queue');
    } else {
      console.yellow(userId + ' not in queue thus not removed');
    }

    res.end();
  };

  return {
    postUser: _postUser,
    delUser: _delUser
  };
}();

module.exports = queueCtrl;