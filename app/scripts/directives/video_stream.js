'use strict';

angular.module('app.directives.videoStream', []).
  directive('videoStream', function() {
    return {
      restrict: 'EA',
      scope: {
        stream: "="
      },
      transclude: true,
      template: "<div class='video' ng-transclude></div>",
      replace: true,
      link: function(scope, elem, attrs) {

        var clientName = attrs.stream.split('.')[2];
        // give the elem a class of either 'remote-stream' or 'local-stream'
        elem.addClass(clientName + '-stream');

        scope.$watch('stream', function(stream) {
          if (stream) {
            elem.find('video').remove();

            var videoElem = stream.createMediaElement();
            videoElem.setAttribute('id', stream.getId());
            elem.append(videoElem);
          }
        });
      }
    }
  });