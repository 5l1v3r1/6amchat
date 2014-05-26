'use strict';

angular.module('app.directives.scrollToBottomWhenChanged', []).
  directive('scrollToBottomWhenChanged', function() {
    return {
      restrict: 'A',
      scope: {
        scrollToBottomWhenChanged: "="
      },
      link: function(scope, elem, attrs) {
        scope.$watch('scrollToBottomWhenChanged.length', function(value) {
          elem.css('overflow-y', 'hidden');
          elem.animate({ scrollTop: elem[0].scrollHeight }, 400, 'swing', function() {
            elem.css('overflow-y', 'scroll');
          });
        });
      }
    }
  });