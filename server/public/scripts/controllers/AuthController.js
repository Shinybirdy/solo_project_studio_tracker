myApp.controller('AuthController', function(AuthFactory) {
  var _this = this;
  var authFactory = AuthFactory;
  _this.loggedIn = authFactory.checkLoggedIn();
  console.log('log in  controller is running');

  $scope.message = "Log In Controller!";
});
