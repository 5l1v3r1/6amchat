'use strict';

angular.module('app.directives.frontDoor', []).
  directive('frontDoor', function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        elem.one('animationstart', function(e) {
          elem.css('pointer-events', 'none');
        });

        elem.one('animationend', function(e) {
          elem.remove();
        });

        elem.one('webkitAnimationStart', function(e) {
          elem.css('pointer-events', 'none');
        });

        elem.one('webkitAnimationEnd', function(e) {
          elem.remove();
        });
      }
    }
    });