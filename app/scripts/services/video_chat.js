'use strict';

angular.module('bonfireApp.services.videoChat', [])
  .factory('videoChat', function($rootScope, vline, chatQueue, $timeout, $sce) {

      var _channel = null, _calls = [];
      var _waitStart = null, _waitEnd = null;

      var videoChat = {};
      videoChat.isChatting = false, videoChat.isAvailable = false;
      videoChat.streams = {
        local: null,
        remote: null
      }

      videoChat.msgPlaceholder = "";
      videoChat.msg = "", videoChat.msgs = [], videoChat.countingUnreadMsgs = false;
      var _unreadMsgsCounter = 0;

      function _callNewPartner() {
        _waitStart = Date.now();

        $timeout(function() {
          if (chatQueue.isWaiting) {
            videoChat.msgs.push({
              payload: $sce.trustAsHtml("We're trying to find someone for you."),
              sentBySelf: false,
              time: new Date(),
              html: true
            });
          }
        }, 1500);

        $timeout(function() {
          if (chatQueue.isWaiting) {
            videoChat.msgs.push({
              payload: $sce.trustAsHtml("If the wait takes too long, " +
                                        "feel free to share about us on Facebook or" +
                                        " Twitter so more people sign on!" +
                                        "<div id='waiting-share-links'>" +
                                        "<div data-href='https://developers.facebook.com/docs/plugins/' " +
                                        "data-layout='button_count' data-action='like' data-show-faces='true' " +
                                        "data-share='true' class='fb-like'></div>" +
                                        "<a href='https://twitter.com/share' class='twitter-share-button' " +
                                        "data-lang='en'>Tweet</a>" +
                                        "</div>"),
              sentBySelf: false,
              time: new Date(),
              html: true
            });
          }
        }, 3500).then(function() {
          $timeout(function() {
            twttr.widgets.load(document.getElementById("waiting-share-links"));
            FB.XFBML.parse(document.getElementById("waiting-share-links"));
          }, 10);
        });

        chatQueue.getPartner(function(partnerId) {
          // has to be in anonymous fn because vline#session
          // depends on the keyword "this"
          vline.session.startMedia(partnerId);
        });
      }

      videoChat.hangUp = function() {
        _channel.stopMedia();
      }

      videoChat.stopChatting = function() {
        this.isAvailable      = false;
        if (chatQueue.isWaiting) chatQueue.removeSelf();
        if (_channel) this.hangUp();
        // connect bug: vline.client.disconnect();
      }.bind(videoChat);

      function Call(mediaSession) {
        this.mediaSession = mediaSession;

        function onEnterIncoming() {
          // if the mediaSession isn't stopped then it won't enter
          // the closed state, which has a callback to call a new partner
          // this is important for the user who was calling – they should call someone new
          // if the other didn't accept the call
          videoChat.isAvailable ? this.mediaSession.start() : this.mediaSession.stop();
        }

        function onEnterConnecting() {
          videoChat.msgs.length = 0;
          videoChat.isChatting  = true;
          chatQueue.isWaiting   = false;
          _waitEnd              = Date.now();
          _channel              = this.mediaSession.getChannel();
        }

        function onEnterClosed() {
          mixpanel.track('Finished Chat', {
            "num_of_msgs": videoChat.msgs.length,
            "wait_time_in_secs": parseInt((_waitEnd - _waitStart) / 1000),
            "chat_time_in_secs": parseInt((Date.now() - _waitEnd) / 1000)
          });

          videoChat.msgPlaceholder  = "";
          videoChat.msg             = "";
          videoChat.msgs.length     = 0;
          _channel                  = null;
          _waitEnd                  = null;
          _waitStart                = null;

          if (videoChat.isAvailable) _callNewPartner();
        }

        function onAddRemoteStream(e) {
          $rootScope.$apply(function() {
            videoChat.streams.remote = e.stream;
            videoChat.msgPlaceholder = "Type a message...";
          });
        }

        function onRemoveRemoteStream(e) {
          $("#" + e.stream.getId()).remove();
        }

        mediaSession.
          on('enterState:incoming', onEnterIncoming, this).
          on('enterState:connecting', onEnterConnecting, this).
          on('enterState:closed', onEnterClosed, this).
          on('mediaSession:addRemoteStream', onAddRemoteStream, this).
          on('mediaSession:removeRemoteStream', onRemoveRemoteStream, this);
      }

      function _onAddMediaSession(e) {
        var mediaSession = e.target;

        _calls.push(new Call(mediaSession));
      }

      function _onRemoveMediaSession(e) {
        var mediaSession = e.target;

        this.isChatting = false;
        // Clean up call list when call ends
        _calls.splice(_calls.indexOf(mediaSession), 1);
      }

      function _onMessage(e) {
        var msg = e.message;

        $rootScope.$apply(function() {
          videoChat.msgs.push({
            payload: msg.getBody(),
            sentBySelf: false,
            time: new Date(),
            html: false
          });
        });
      }

      vline.client.
        on('add:mediaSession', _onAddMediaSession, videoChat).
        on('remove:mediaSession', _onRemoveMediaSession, videoChat).
        on('recv:im', _onMessage, videoChat);

      videoChat.login = function(authToken) {
        videoChat.msgs.length = 0;
        return vline.login(authToken).then(this.callFirstPartner);
      }.bind(videoChat);

      videoChat.logout = function() {
        this.stopChatting();

        var localMediaStream = this.streams.local;
        if (localMediaStream) {
          $("#" + localMediaStream.getId()).remove();
          localMediaStream.stop();
        }

        this.streams.local = null;
      }.bind(videoChat);

      videoChat.logoutClient = vline.logout;

      videoChat.callFirstPartner = function() {
        mixpanel.track('Clicked Start');

        vline.client.getLocalStream().
          done(function(e) {
            this.streams.local = e;
            this.isAvailable = true;
            _callNewPartner();
          }, this);
      }.bind(videoChat);

      videoChat.sendMsg = function(e) {
        e.preventDefault();
        var msg = this.msg;

        if (msg) {
          this.msg = "";
          this.msgs.push({payload: msg, sentBySelf: true, time: new Date()});
          _channel.publishMessage(msg);
        }
      }.bind(videoChat);

      videoChat.changeInMsger = function(index) {
        var msg = this.msgs[index];
        var prevMsg = this.msgs[index - 1];

        if (!prevMsg) {
          return true;
        } else if (msg) {
          return msg.sentBySelf !== prevMsg.sentBySelf;
        } else {
          return false;
        }
      }.bind(videoChat);

      videoChat.startCountingMsgs = function() {
        this.countingUnreadMsgs = true;
        _unreadMsgsCounter = this.msgs.length;
      }.bind(videoChat);

      videoChat.stopCountingMsgs = function() {
        this.countingUnreadMsgs = false;
        _unreadMsgsCounter = 0;
      }.bind(videoChat);

      videoChat.unreadMsgsCount = function() {
        var count = this.msgs.length - _unreadMsgsCounter
        return count > 0 ? count : "Nexted!";
      }.bind(videoChat);

      return videoChat;
    });