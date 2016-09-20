myApp.factory('AuthFactory', function ($http){
  var Status = {
    loggedIn: false,
  };

return {
  Status: Status,

    checkLoggedIn: function() {
      console.log("factory says logged in");
      return Status.loggedIn;

    },

    isLoggedIn: function () {
      return $http.get('/auth');
    },

    setLoggedIn: function (value) {
      Status.loggedIn = value;
    },

    logout: function () {
      return $http.get('/auth/logout');
    },
  };
});
