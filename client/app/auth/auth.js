// Auth controller
// ---------------
//
// This feature is not finished yet. Current target is not to implement actual authorization, but simply to link users to ideas (and eventually comments).

angular.module('glint.auth', [])

.controller('AuthCtrl', function(Auth, $scope, $window, $location){ 
  var self = this;
  self.user = {};
  // for displaying the login error message
  $scope.loginUsernameFailure = false;
  $scope.loginPasswordFailure = false;
  $scope.userNameExists = false;

  // Allow user to declare who they are to the system.
  self.signin = function() {
    self.user.username = self.user.username;
    self.user.password = self.user.password;
    var user = JSON.stringify(self.user);

    Auth.signin(user)
    .then(function (res){
      $scope.loginUsernameFailure = false;
      $scope.loginPasswordFailure = false;
      $scope.loginFailure = false;
      token = res.data;
      $window.localStorage.setItem('com.glint', JSON.stringify(token));
      $location.path('/');
    })
    .catch(function (error){
      //render error happens in Auth.signin service
      if (error.status === 401 && error.status === 404) {
        $scope.loginUsernameFailure = true;
        $scope.loginPasswordFailure = true;
      }
      else if (error.status === 401) {
        $scope.loginUsernameFailure = false;
        $scope.loginPasswordFailure = true;
      }
      else if (error.status === 404) {
        $scope.loginPasswordFailure = false;
        $scope.loginUsernameFailure = true;
      }
    });
  };

  // Allow user to first-time identify themselves to the system.
  self.signup = function() {
    self.user.username = self.user.username;
    self.user.password = self.user.password;
    var user = JSON.stringify(self.user);

    Auth.signup(user)
    .then(function (res){
      $scope.userNameExists = false;
      token = res.data;
      $window.localStorage.setItem('com.glint', JSON.stringify(token));
      $location.path('/');
    })
    .catch(function (error){
      console.error('signup error', error);
      $scope.userNameExists = true;
    });
  };

  self.signout = function() {
    Auth.signout()
  };


});
