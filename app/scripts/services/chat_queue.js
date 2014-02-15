'use strict';

angular.module('bonfireApp.services.chatQueue', [])
  .factory('chatQueue', function($http, vline) {
    var chatQueue = {};

    chatQueue.isWaiting = false;

    chatQueue.getPartner = function(cb) {
      this.isWaiting = true;

      return $http.post('/api/queue/' + vline.userId).success(function(data) {
        var partnerId = data.userId;

        if (partnerId) {
          this.isWaiting = false;
          cb(partnerId);
        };
      }.bind(this));
    }

    chatQueue.removeSelf = function() {
      return $http.delete('/api/queue/' + vline.userId);
    }

    return chatQueue;
  });