'use strict';

angular.module('app')
  .controller('ChatCtrl', function($scope, videoChat, auth) {

    var _orgPageTitle = document.title;

    $scope.videoChat      = videoChat;
    $scope.auth           = auth;
    $scope.onbeforeunload = auth.logoutPermanently;
    $scope.loggingInMsg   = typeof InstallTrigger !== 'undefined' ? (
                              'clicking Share...'
                            ) : (
                              'clicking Allow...'
                            )

    $scope.onblur = function() {
      videoChat.startCountingMsgs();
    };

    $scope.onfocus = function() {
      videoChat.stopCountingMsgs();
      document.title = _orgPageTitle;
    };

    $scope.$watch('videoChat.msgs.length', function(value) {
      if (videoChat.countingUnreadMsgs) {
        var newTitle = "(" + videoChat.unreadMsgsCount() + ") " + _orgPageTitle;
        document.title = newTitle;
      }
    });

  });