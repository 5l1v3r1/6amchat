'use strict';

angular.module('bonfireApp.directives.frontDoor', []).
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
      }
    }
    });