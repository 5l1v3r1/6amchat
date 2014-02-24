'use strict';

angular.module('bonfireApp.directives.msgTextarea', []).
  directive('msgTextarea', function($timeout) {
    return {
      restrict: 'EA',
      template: '<textarea></textarea>',
      replace: true,
      link: function(scope, elem, attrs) {
        elem.on('keypress', function(e) {
          if (e.keyCode == 13) {
            e.preventDefault();
            e.stopPropagation();
            var $form = $(e.target.form);
            $form.submit();
          }
        });

        function focusTextarea(value) {
          if (value) {
            $timeout(function() {
              elem[0].focus();
            }, 0);
          }
        }

        scope.$watch('videoChat.isChatting', focusTextarea);
      }
    }
    });