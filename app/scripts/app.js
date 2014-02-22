'use strict';

var app = angular.module('bonfireApp', ['bonfireApp.services', 'bonfireApp.directives', 'ngAnimate', 'config']);

angular.module('bonfireApp.services', [ 'bonfireApp.services.vline',
                                        'bonfireApp.services.videoChat',
                                        'bonfireApp.services.chatQueue',
                                        'bonfireApp.services.facebook',
                                        'bonfireApp.services.auth' ]);

angular.module('bonfireApp.directives', [ 'bonfireApp.directives.videoStream',
                                          'bonfireApp.directives.scrollToBottomWhenChanged',
                                          'bonfireApp.directives.onblur',
                                          'bonfireApp.directives.onfocus',
                                          'bonfireApp.directives.onload',
                                          'bonfireApp.directives.onbeforeunload',
                                          'bonfireApp.directives.frontDoor',
                                          'bonfireApp.directives.deleteWhen',
                                          'bonfireApp.directives.msgTextarea' ]);