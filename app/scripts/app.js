'use strict';

var app = angular.module('app', [ 'app.services',
                                  'app.directives',
                                  'ngAnimate',
                                  'config',
                                  'ngSanitize' ]);

angular.module('app.services', [ 'app.services.vline',
                                 'app.services.videoChat',
                                 'app.services.chatQueue',
                                 'app.services.auth' ]);

angular.module('app.directives', [ 'app.directives.videoStream',
                                   'app.directives.scrollToBottomWhenChanged',
                                   'app.directives.onblur',
                                   'app.directives.onfocus',
                                   'app.directives.onload',
                                   'app.directives.onbeforeunload',
                                   'app.directives.frontDoor',
                                   'app.directives.deleteWhen',
                                   'app.directives.msgTextarea' ]);