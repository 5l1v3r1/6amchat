'use strict';

angular.module('app.directives.onblur', []).
  directive('onblur', function($window) {
    return {
      restrict: 'A',
      link: function(scope) {
        $window.addEventListener('blur', function() {
          scope.onblur();
        });
      }
    }
  });

angular.module('app.directives.onfocus', []).
  directive('onfocus', function($window) {
    return {
      restrict: 'A',
      link: function(scope) {
        $window.addEventListener('focus', function() {
          scope.onfocus();
        });
      }
    }
  });

angular.module('app.directives.onload', []).
  directive('onload', function($window) {
    return {
      restrict: 'A',
      link: function(scope) {
        $window.addEventListener('load', scope.onload);
      }
    }
  });

angular.module('app.directives.onbeforeunload', []).
  directive('onbeforeunload', function($window) {
    return {
      restrict: 'A',
      link: function(scope) {
        $window.addEventListener('beforeunload', scope.onbeforeunload);
      }
    }
  });