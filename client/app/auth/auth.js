// Auth controller
// ---------------
//
// This feature is not finished yet. Current target is not to implement actual authorization, but simply to link users to ideas (and eventually comments).

angular.module('glint.auth', [])

.controller('AuthCtrl', function(Auth, $window, $location){ 
  var self = this;
  self.user = {};

  // Allow user to declare who they are to the system.
  self.signin = function() {
    self.user.username = self.user.username;
    self.user.password = self.user.password;
    var user = JSON.stringify(self.user);

    Auth.signin(user)
    .then(function (token){
        $window.localStorage.setItem('com.glint', token);
        $location.path('/');
    })
    .catch(function (error){
      console.error('login error', error);
    });
  };

  // Allow user to first-time identify themselves to the system.
  self.signup = function() {
    self.user.username = self.user.username;
    self.user.password = self.user.password;
    var user = JSON.stringify(self.user);

    Auth.signup(user)
    .then(function (token){
        $window.localStorage.setItem('com.glint', token);
        $location.path('/');
    })
    .catch(function (error){
      console.error('signup error', error);
    });
  };

  self.signout = function() {
    Auth.signout()
  };


});
