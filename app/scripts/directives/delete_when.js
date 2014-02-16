'use strict';

angular.module('bonfireApp.directives.deleteWhen', []).
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