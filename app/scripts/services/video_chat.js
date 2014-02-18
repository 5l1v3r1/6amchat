'use strict';

angular.module('bonfireApp.services.videoChat', [])
  .factory('videoChat', function($rootScope, vline, chatQueue) {

      var _partner = null, _calls = [];
      var _wait_start = null, _wait_end = null;

      var videoChat = {};
      videoChat.isChatting = false, videoChat.isAvailable = false, videoChat.isWaiting = chatQueue.isWaiting;
      videoChat.streams = {
        local: null,
        remote: null
      }

      // videoChat.msgPlaceholder = "";
      videoChat.msg = "", videoChat.msgs = [], videoChat.countingUnreadMsgs = false;
      var _unreadMsgsCounter = 0;

      function _callNewPartner() {
        _wait_start = Date.now();
        chatQueue.getPartner(function(partnerId) {
          // has to be in anonymous fn because vline#session
          // depends on the keyword "this"
          vline.session.startMedia(partnerId);
        });
      }

      videoChat.hangUp = function() {
        _partner.stopMedia();
      }

      videoChat.stopChatting = function() {
        this.isAvailable = false;
        if (chatQueue.isWaiting) chatQueue.removeSelf();
        if (_partner) this.hangUp();
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
          videoChat.isChatting = true;
          _wait_end = Date.now();
        }

        function onEnterActive() {
          // NOTE: assumes there is only one remote stream
          _partner = this.mediaSession.getRemoteStreams()[0].getPerson();
        }

        function onEnterClosed() {
          mixpanel.track('Finished Chat', {
            "num_of_msgs": videoChat.msgs.length,
            "wait_time_in_secs": parseInt((_wait_end - _wait_start) / 1000),
            "chat_time_in_secs": parseInt((Date.now() - _wait_end) / 1000)
          });

          videoChat.msgs.length = 0;
          _partner = null;
          _wait_end = null;
          _wait_start = null;
          videoChat.partnerIsTyping = false;

          if (videoChat.isAvailable) _callNewPartner();
        }

        function onAddRemoteStream(e) {
          $rootScope.$apply(function() {
            videoChat.streams.remote = e.stream;
          });
        }

        function onRemoveRemoteStream(e) {
          $("#" + e.stream.getId()).remove();
        }

        mediaSession.
          on('enterState:incoming', onEnterIncoming, this).
          on('enterState:connecting', onEnterConnecting, this).
          on('enterState:active', onEnterActive, this).
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
          videoChat.msgs.push({payload: msg.getBody(), username: 'Them', time: new Date()});
        });
      }

      vline.client.
        on('add:mediaSession', _onAddMediaSession, videoChat).
        on('remove:mediaSession', _onRemoveMediaSession, videoChat).
        on('recv:im', _onMessage, videoChat);

      videoChat.login = vline.login;

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
        // this.msgPlaceholder = "Quick! Type a joke here and send it by pressing enter before they next you!";
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

        // this.msgPlaceholder = "";
        var msg = this.msg;

        if (msg) {
          this.msg = "";
          this.msgs.push({payload: msg, username: 'Me', time: new Date()});
          _partner.publishMessage(msg);
        }
      }.bind(videoChat);

      videoChat.changeInMsger = function(index) {
        var msg = this.msgs[index];
        var prevMsg = this.msgs[index - 1];

        if (!prevMsg) {
          return true;
        } else if (msg) {
          return msg.username !== prevMsg.username;
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

      videoChat.informIsTyping = function() {
        _partner.informLocalTyping();
      }

      setInterval(function() {
        if (_partner) {
          $rootScope.$apply(function() {
            videoChat.partnerIsTyping = _partner.isTyping();
          })
        }
      }, 1000);

      return videoChat;
    });