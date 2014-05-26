* [x] Document most recent devop stuff
* [x] Make responsive for window size

* [x] Replace font
* [x] Add "landing page" info

* [x] Add waiting animation
* [x] Add animation/colour to "next step" btns
* [x] Design logo & add favicon
* [x] style chat
* [x] Add Mixpanel
* [x] add meta description
* [x] Change font of #front-page
* [x] bower_components ain't being cdn'ified
* [x] add gzip`ping to nginx (75% redux in bits going over the wire!)
* [x] add caching to files (look in pagespeed chrome ext)
* [x] fix mixpanel (adblock's doing it :p)
* [x] Setup node process
* [x] add beta tag
* [x] Come up w/ name and design logo

* [x] clear textarea after nexting
* [x] send msg after clicking start saying hold on we're connecting you w/ someone now
* [x] spiffy up twitter/fb pages
* [x] fix fb/twitter links
* [x] Add social media btns
* [x] Show msg
  "Hm, your wait seems to be getting long. You can help us get more people on by sharing about us!"
  "Hm, your wait seems to be getting long. Try get more people on by sharing about us!"
  "Hm, your wait seems to be getting long. Try get one of your friends on by sharing about us!"

* [x] fix fb modal cut off
* [x] iterate bios on twitter/fb pages
* [x] get rid of bonfire names, fb names, etc.
* [x] fix up analytics
* [ ] double check in firefox

* [ ] add open graph tags
* [ ] add twitter tags

* [ ] config for other browsers
* [ ] add contact, faq, terms, privacy pages

* [ ] add conversational headers (Conversation Started – 6:59 pm, etc.)
* [ ] Style for when vertical height of window is smaller
* [ ] optimize `scope.$watch`es for performance
* [ ] sometimes cam isn't turned off on logout

===

* [x] replace bodyParser w/ just JSON
* [x] make sure request for route ends successfully
* [x] API routes to only accept JSON, otherwise to respond w/ 406
* [x] buggy when partner is nexted
* [x] don't answer incoming call if busy or not currently open for calls
* [x] how to solve issue of being able to put yourself in the queue multiple times?

* [x] implement oauth and sign in w/ facebook/twitter
  * [x] Create User model
  * [x] Create links on frontend to login w/ oauth
  * [x] Try changing view engine in express.js to jade and add jade npm
  * [x] Render views server-side
  * [x] refactor auth.login
  * [x] Update angular services to reflect server side auth
    * [x] add link to /logout in chat.jade
    * [x] on window unload logout of vLine client
    * [x] on chat.jade load login user into vLine client using JWT payload from the backend
  * [x] Generate JWT payload for creating vLine client w/ imported users
* [x] on window unload logout (search unload in all files)

* [x] implement text messaging
* [?] only userId that is equal to the current user's can be sent to the server

* [?] if outgoing call was not successful, make another call

* [x] msgs can't be sent unless chatting
* [x] automatically scroll to bottom of #msgs
* [x] get rid of the little space in the scrollbar

* [x] add msg that says press enter to send msg, show input is disabled when not chatting, and add default msg when none exist in #msgs
* [x] automatically focus on input upon new convo

* [x] make clicking logout btn call logout route
* [x] fix conditionals of btns based on auth, similarily, make btns disabled when appropriate
* [x] on page load login if logged in
* [x] fix bug where submitting textarea refreshes page

* [x] add unread msgs to title
* [x] remove mediastream from DOM when hung up (so black screen doesn't appear)
* [x] iterate style of #chat (including ratio size of #send-msg-form)

* [x] fix time shown when msgs from me were sent
* [x] fix time shown when msgs from partner were sent
* [x] add partner is typing status
* [x] disable textarea if not logged in and focus on textarea upon new convo

* [x] add logging in status
* [x] add page loading animation where you only see "ODYSSEY" first and then colour fades out
* [x] make on hover of logo social media icons/email appear
* [x] on click of "Start" 2nd btn slides in from the right, and on click of "Stop", that 2nd btn slides out to the right
* [x] get rid of animation for #brand-name

* [x] fix bug w/ local stream being removed on stop
* [x] remove local stream when logged out
* [x] can't log back in after logging out for some reason
* [x] double check api calls can't be made unless cookie <3
* [x] can't connect w/ any user again after logging back in
* [x] if already have authToken for fb, use that for when logging back in
  - so it turns out the authToken expires on logout, and the login dialog

* [x] option to turn off audio
  - can click btn in corner of local-stream div to flip it and see a panel of settings

* [MOST EXCELLENT FAIL] iterate style and add sick color scheme!!!!

* [x] make send button styled like other buttons
* [x] add sick css3 animation when waiting!!!
* [ ] make responsive for window size
* [ ] add back partner is typing status
* [ ] fix audio option
* [ ] on production prohibit more than one client on one machine

* [?] stop remoteMediaStream in video_chat.js where appropriate

* [ ] figure out how i can make it so that you can't just give any userId into the queue and spam the queue with bad ids
  - if calls aren't picked up then you're banned

* [ ] for mobile users, don't give app, instead show landing page describing it, and have field w/ below it "Let us send you an email to remind you to check out this app when you get on your computer. Then we'll have your email address and we'll spam you a million thousand times! #geniusplan Okay so we won't spam you, in fact, we won't even subscribe you to anything (in fact, we don't even have anything to subscribe you to)." Then on form submission redirect to tumblr blog w/ best chats.

* [ ] have "subreddits" -> can create a new room, can join a room, and mods can ban users from a room

# Good To Know:

* NTD: and NOTE: exist in files

# To ask the fucking guys at vLine:

* When does mediaStream:end event happen?
* getCreationTime is returned undefined, what gives?
* i don't logout of vline client if i'm disconnected, yet it says in the docs a session only expires w/ client.logout()
* search in all files for "connect bug"

# Refactor

* [x] make vline service
* [x] make messages service (didn't make sense to do this, just modify api instead)
* [ ] refactor window and document bindings to directives