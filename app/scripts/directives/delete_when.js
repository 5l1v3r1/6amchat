'use strict';

angular.module('app.directives.deleteWhen', []).
  directive('deleteWhen', function() {
    return {
      restrict: 'A',
      scope: {
        deleteWhen: "="
      },
      link: function(scope, elem, attrs) {
        scope.$watch('deleteWhen', function(value) {
          if (value) elem.remove();
        });
      }
    }
    });